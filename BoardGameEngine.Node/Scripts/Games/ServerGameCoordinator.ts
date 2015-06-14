module AgileObjects.BoardGameEngine.Games {

    export class ServerGameCoordinator {
        private _cpuPlayerAi: Pl.CpuPlayerAi;

        constructor(
            private _gameMapper: GameMapper,
            private _getGetDataQuery: Ts.IGetQuery<GameData>,
            private _saveGameCommand: Ts.ICommand<Game>) {

            this._cpuPlayerAi = new Players.CpuPlayerAi();
        }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("playerJoinRequested",(request: Pl.PlayerJoinRequest) => {
                // TODO: Validate join request
                var gameData = this._getGetDataQuery.execute(request.gameId);
                socket.emit("playerJoinValidated", gameData);
            });

            socket.on("gameStarted",(gameData: GameData) => {
                var game = this._createServerSideGameRepresentation(gameData);
                socket.session.game = game;
                this._saveGameCommand.execute(game);
                console.log("Game " + game.id + " created and saved");
            });

            socket.on("turnStarted",(teamId: string) => {
                var game: Game = socket.session.game;
                var currentTeam = game.status.turnManager.currentTeam;
                if (currentTeam.id !== teamId) {
                    throw new Error(
                        "Turn starting out of sync: " +
                        "expected team " + currentTeam.id + ", got team " + teamId);
                }
                if (currentTeam.owner.isHuman) { return; }

                var cpuTurnData = this._performCpuTurn(currentTeam);
                socket.emit("turnEnded", cpuTurnData);
            });

            socket.on("turnEnded",(turnData: I.TurnData) => {
                if (socket.session.game.status.turnManager.currentTeam.owner.isHuman) {
                    this._applyTurn(turnData, socket);
                }
                this._handleTurnEnded(socket);
            });
        }

        private _createServerSideGameRepresentation(gameData: GameData): Game {
            var game = this._gameMapper.map(gameData);

            game.start();

            return game;
        }

        private _performCpuTurn(currentCpuTeam: T.Team): I.TurnData {
            var cpuTurnInteractions = new Array<IPieceInteraction>();

            while (true) {
                var nextCpuTurnInteraction = this._cpuPlayerAi.getNextInteraction(currentCpuTeam);

                if (nextCpuTurnInteraction === undefined) { break; }

                nextCpuTurnInteraction.complete();
                cpuTurnInteractions.push(nextCpuTurnInteraction);
            }

            return Interactions.TurnData.forInteractions(cpuTurnInteractions);
        }

        private _applyTurn(turnData: Interactions.TurnData, socket: Node.ISessionSocket): void {
            for (var i = 0; i < turnData.interactionData.length; i++) {
                var turnInteractionData = turnData.interactionData[i];
                this._handleInteractionCompleted(turnInteractionData.pieceId, turnInteractionData.interactionId, socket);
            }
        }

        private _handleInteractionCompleted(pieceId: string, interactionId: string, socket: Node.ISessionSocket): void {
            var game: Game = socket.session.game;
            var currentTeamPieces = game.status.turnManager.currentTeam.getPieces();
            if (!currentTeamPieces.hasOwnProperty(pieceId)) {
                throw new Error(
                    "Interaction completion out of sync: " +
                    "expected pieces for team " + game.status.turnManager.currentTeam + ", " +
                    "got piece " + pieceId);
            }
            var piece = currentTeamPieces[pieceId];
            var potentialInteractions = piece.interactionProfile.getPotentialInteractions();
            if (!potentialInteractions.hasOwnProperty(interactionId)) {
                throw new Error(
                    "Interaction completion out of sync: " +
                    "expected interactions for piece " + pieceId + ", " +
                    "got interaction " + interactionId);
            }
            potentialInteractions[interactionId].complete();
            console.log("Interaction synchronised: " + interactionId);
        }

        private _handleTurnEnded(socket: Node.ISessionSocket): void {
            var game: Game = socket.session.game;
            var currentTeam = game.status.turnManager.currentTeam;
            var currentTeamIndex = game.teams.indexOf(currentTeam);
            var nextTeamIndex = currentTeamIndex + 1;
            if (nextTeamIndex === game.teams.length) {
                nextTeamIndex = 0;
            }
            var nextTeam = game.teams[nextTeamIndex];
            game.events.turnValidated.publish(nextTeam);
            this._saveGameCommand.execute(game);
            socket.emit("turnValidated", nextTeamIndex);
        }
    }
};