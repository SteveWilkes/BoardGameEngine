module AgileObjects.StrategyGame.Games {

    export class ServerGameCoordinator {
        private _cpuPlayerAi: Players.CpuPlayerAi;

        constructor(private _gameFactory: GameFactory, private _teamFactory: Teams.TeamFactory) {
            this._cpuPlayerAi = new Players.CpuPlayerAi();
        }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted", (gameData: Status.GameData) => {
                socket.session.game = this._createServerSideGameRepresentation(gameData);
                console.log("Game " + socket.session.game.id + " created");
            });

            socket.on("turnStarted", (teamId: string) => {
                var game: Game = socket.session.game;
                var currentTeam = game.status.getCurrentTeam();
                if (currentTeam.id !== teamId) {
                    // Out of sync
                }
                if (currentTeam.owner.isHuman) { return; }

                var cpuTurnInteractions = this._cpuPlayerAi.getNextTurn(currentTeam, game);
                var turnData = Status.TurnData.forInteractions(cpuTurnInteractions);
                this._applyTurn(turnData, socket);
                socket.emit("turnEnded", turnData);
            });

            socket.on("turnEnded", (turnData: Status.TurnData) => {
                if (socket.session.game.status.getCurrentTeam().owner.isHuman) {
                    this._applyTurn(turnData, socket);
                }
                this._handleTurnEnded(socket);
            });
        }

        private _createServerSideGameRepresentation(gameData: Status.GameData): Game {
            var game = this._gameFactory.createNewGame(gameData.gameId, gameData.gameTypeId);

            for (var i = 0; i < gameData.playerData.length; i++) {
                var data = gameData.playerData[i].split("*");
                var player = new Players.Player(data[0], data[1] === "1");
                game.add(player);
                var numberOfTeams = parseInt(data[2]);
                for (var j = 0; j < numberOfTeams; j++) {
                    var team = this._teamFactory.createTeam(player, gameData.gameTypeId);
                    game.board.add(team);
                }
            }

            game.start();

            return game;
        }

        private _applyTurn(turnData: Status.TurnData, socket: Node.ISessionSocket): void {
            for (var i = 0; i < turnData.interactionData.length; i++) {
                var turnInteraction = turnData.interactionData[i];
                this._handleInteractionCompleted(turnInteraction.pieceId, turnInteraction.interactionId, socket);
            }
        }

        private _handleInteractionCompleted(pieceId: string, interactionId: string, socket: Node.ISessionSocket): void {
            var game: Game = socket.session.game;
            var currentTeamPieces = game.status.getCurrentTeam().getPieces();
            if (!currentTeamPieces.hasOwnProperty(pieceId)) {
                // Out of sync
            }
            var piece = currentTeamPieces[pieceId];
            var potentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, game);
            if (!potentialInteractions.hasOwnProperty(interactionId)) {
                // Out of sync
            }
            potentialInteractions[interactionId].complete();
            console.log("Interaction synchronised");
        }

        private _handleTurnEnded(socket: Node.ISessionSocket): boolean {
            var game: Game = socket.session.game;
            var currentTeam = game.status.getCurrentTeam();
            var currentTeamIndex = game.teams.indexOf(currentTeam);
            var nextTeamIndex = currentTeamIndex + 1;
            if (nextTeamIndex === game.teams.length) {
                nextTeamIndex = 0;
            }
            var nextTeam = game.teams[nextTeamIndex];
            game.events.turnValidated.publish(nextTeam);
            socket.emit("turnValidated", nextTeamIndex);
            return true;
        }
    }
};