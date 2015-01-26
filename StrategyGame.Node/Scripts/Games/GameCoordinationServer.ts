module AgileObjects.StrategyGame.Games {

    export class GameCoordinationServer {
        private _cpuPlayerAi: Players.CpuPlayerAi;

        constructor(private _gameFactory: GameFactory, private _teamFactory: Teams.TeamFactory) {
            this._cpuPlayerAi = new Players.CpuPlayerAi();
        }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted", (gameData: Status.GameData) => {
                socket.session.game = this._createServerSideGameRepresentation(gameData, socket);
                console.log("Game " + socket.session.game.id + " created");
            });

            socket.on("pieceMoved", (originCoordinates: string, destinationCoordinates: string) => {
                var game: Game = socket.session.game;
                var boardTiles = game.board.getTiles();
                var origin = boardTiles[originCoordinates];
                var destination = boardTiles[destinationCoordinates];
                origin.movePieceTo(destination.piece || destination);
                console.log("Game " + game.id + ": piece moved from " + originCoordinates + " to " + destinationCoordinates);
            });

            socket.on("pieceAttacked", (attackerId: string, interactionId: string) => {
                var game: Game = socket.session.game;
                var currentTeamPieces = game.status.getCurrentTeam().getPieces();
                if (!currentTeamPieces.hasOwnProperty(attackerId)) {
                    // Out of sync
                }
                var attacker = currentTeamPieces[attackerId];
                var potentialInteractions = attacker.interactionProfile.getPotentialInteractions(attacker, game);
                // TODO: Make interactions indexable by id
                for (var j = 0; j < potentialInteractions.length; j++) {
                    if (potentialInteractions[j].id === interactionId) {
                        potentialInteractions[j].complete();
                        console.log("Game " + game.id + ": piece " + attackerId + " attacks!");
                        return;
                    }
                }

            });

            socket.on("turnStarted", (teamId: string) => {
                var game: Game = socket.session.game;
                var currentTeam = game.status.getCurrentTeam();
                if (currentTeam.id !== teamId) {
                    // Out of sync
                }
                if (currentTeam.owner.isHuman) { return; }

                var cpuTurnInteractions = this._cpuPlayerAi.getNextTurn(currentTeam, game);
                socket.emit("turnTaken", new Status.TurnData(cpuTurnInteractions));
            });

            socket.on("turnEnded", (teamId: string) => {
                var game: Game = socket.session.game;
                var currentTeam = game.status.getCurrentTeam();
                if (currentTeam.id !== teamId) {
                    // Out of sync
                }
                this._handleTurnEnded(currentTeam, game, socket);
            });
        }

        private _createServerSideGameRepresentation(gameData: Status.GameData, socket: SocketIO.Socket): Game {
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

            // TODO: Get rid of casting:
            game.events.turnEnded.subscribe(t => this._handleTurnEnded(<Teams.Team>t, game, socket));

            game.start();

            return game;
        }

        private _handleTurnEnded(
            currentTeam: Teams.Team,
            game: Games.Game,
            socket: SocketIO.Socket): boolean {

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