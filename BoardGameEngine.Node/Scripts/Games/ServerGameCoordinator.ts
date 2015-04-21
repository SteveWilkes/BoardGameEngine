﻿module AgileObjects.BoardGameEngine.Games {

    export class ServerGameCoordinator {
        private _cpuPlayerAi: Players.CpuPlayerAi;

        constructor(private _gameFactory: GameFactory, private _teamFactory: Teams.TeamFactory) {
            this._cpuPlayerAi = new Players.CpuPlayerAi();
        }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted",(gameData: Status.GameData) => {
                socket.session.game = this._createServerSideGameRepresentation(gameData);
                console.log("Game " + socket.session.game.id + " created");
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

                var cpuTurnData = this._performCpuTurn(currentTeam, game);
                socket.emit("turnEnded", cpuTurnData);
            });

            socket.on("turnEnded",(turnData: Status.TurnData) => {
                if (socket.session.game.status.turnManager.currentTeam.owner.isHuman) {
                    this._applyTurn(turnData, socket);
                }
                this._handleTurnEnded(socket);
            });
        }

        private _createServerSideGameRepresentation(gameData: Status.GameData): Game {
            var game = this._gameFactory.createNewGame(gameData.gameId, gameData.gameTypeId);

            var teamNumber = 1;
            for (var i = 0; i < gameData.playerData.length; i++) {
                var playerData = gameData.playerData[i];
                var player = new Players.Player(playerData.id, playerData.isHuman);
                game.add(player);
                for (var j = 0; j < playerData.numberOfTeams; j++) {
                    var team = this._teamFactory.createTeamFor(player, teamNumber, game.type.pieceData);
                    game.board.add(team);

                    ++teamNumber;
                }
            }

            game.start();

            return game;
        }

        private _performCpuTurn(currentCpuTeam: Teams.Team, game: Game): Status.TurnData {
            var cpuTurnInteractions = new Array<IPieceInteraction>();

            while (true) {
                var nextCpuTurnInteraction = this._cpuPlayerAi.getNextInteraction(currentCpuTeam, game);

                if (nextCpuTurnInteraction === undefined) { break; }

                nextCpuTurnInteraction.complete();
                cpuTurnInteractions.push(nextCpuTurnInteraction);
            }

            return Status.TurnData.forInteractions(cpuTurnInteractions);
        }

        private _applyTurn(turnData: Status.TurnData, socket: Node.ISessionSocket): void {
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
            var potentialInteractions = piece.getPotentialInteractions(game);
            if (!potentialInteractions.hasOwnProperty(interactionId)) {
                throw new Error(
                    "Interaction completion out of sync: " +
                    "expected interactions for piece " + pieceId + ", " +
                    "got interaction " + interactionId);
            }
            potentialInteractions[interactionId].complete();
            console.log("Interaction synchronised: " + interactionId);
        }

        private _handleTurnEnded(socket: Node.ISessionSocket): boolean {
            var game: Game = socket.session.game;
            var currentTeam = game.status.turnManager.currentTeam;
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