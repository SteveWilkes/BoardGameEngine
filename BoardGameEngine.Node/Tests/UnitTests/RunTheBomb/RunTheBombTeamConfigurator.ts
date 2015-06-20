module AgileObjects.BoardGameEngine.Games {
    import Ts = TypeScript;

    export class RunTheBombTeamConfigurator implements ITeamConfigurator {
        private _configurations: Ts.Dictionary<number, Array<P.PieceConfigData>>;
        private _customHealthSettings: Ts.Dictionary<Ts.Coordinates, number>;

        constructor() {
            this._configurations = new Ts.Dictionary<number, Array<P.PieceConfigData>>();
            this._customHealthSettings = new Ts.Dictionary<Ts.Coordinates, number>();
        }

        public forTeam(teamNumber: number): RunTheBombTeamConfigurator {
            this._configurations.add(teamNumber, new Array<P.PieceConfigData>());

            return this;
        }

        public aBombAt(coordinatesSignature: string): RunTheBombTeamConfigurator {
            return this._addPieces("1", [coordinatesSignature]);
        }

        public aSoldierAt(coordinatesSignature: string): RunTheBombTeamConfigurator {
            return this.soldiersAt(coordinatesSignature);
        }

        public soldiersAt(...coordinatesSignatures: Array<string>): RunTheBombTeamConfigurator {
            return this._addPieces("2", coordinatesSignatures);
        }

        public aNinjaAt(coordinatesSignature: string): RunTheBombTeamConfigurator {
            return this.ninjasAt(coordinatesSignature);
        }

        public ninjasAt(...coordinatesSignatures: Array<string>): RunTheBombTeamConfigurator {
            return this._addPieces("3", coordinatesSignatures);
        }

        public withHealth(health: number): RunTheBombTeamConfigurator {
            var mostRecentConfigData = this._getMostRecentConfigData();
            this._customHealthSettings.set(mostRecentConfigData.pieceCoordinates, health);
            return this;
        }

        public withTheBomb(): RunTheBombTeamConfigurator {
            var mostRecentConfigData = this._getMostRecentConfigData();
            return this.aBombAt(mostRecentConfigData.pieceCoordinates.signature);
        }

        private _getMostRecentConfigData() {
            var currentConfigDataSet = this._getCurrentConfigDataSet();
            var mostRecentConfigData = currentConfigDataSet[currentConfigDataSet.length - 1];

            return mostRecentConfigData;
        }

        private _getCurrentConfigDataSet() {
            return this._configurations.values[this._configurations.values.length - 1];
        }

        private _addPieces(pieceDefinitionId: string, coordinatesSignatures: Array<string>): RunTheBombTeamConfigurator {
            for (var i = 0; i < coordinatesSignatures.length; i++) {
                this._getCurrentConfigDataSet().push(
                    new Pieces.PieceConfigData(
                        pieceDefinitionId,
                        Ts.CoordinatesLibrary.INSTANCE.get(coordinatesSignatures[i])));
            }

            return this;
        }

        public getGameOwner(): Pl.Player {
            return this._createPlayer(this._configurations.keys[0].toString(), "GameOwner");
        }

        private _createPlayer(id: string, name: string) {
            return new Players.Player(id, name, true, true);
        }

        public setupTeams(game: Game): void {
            var teamFactory = new Teams.TeamFactory();
            var defaultPieceData = game.type.pieceData;
            var boardTilesByCoordinates = game.board.getTiles();
            for (var i = 0; i < this._configurations.count; i++) {
                var playerId = this._configurations.keys[i].toString();
                var player;

                if (playerId !== game.owner.id) {
                    player = this._createPlayer(playerId, "Player-" + playerId);
                    game.add(player);
                } else {
                    player = game.owner;
                }

                var configData = this._configurations.values[i];
                game.type.pieceData = new Pieces.PieceDataSet(defaultPieceData.definitions, configData);
                var customTeam = teamFactory.createTeamFor(player, game);
                game.board.add(customTeam);

                var customTeamPiecesById = customTeam.getPieces();

                for (var pieceId in customTeamPiecesById) {
                    var customPiece = customTeamPiecesById[pieceId];
                    var customPieceCoordinates = customTeam.getInitialCoordinatesFor(customPiece);

                    var customHealthSetting = this._customHealthSettings.tryGet(customPieceCoordinates);
                    if (customHealthSetting.found) {
                        customPiece.health = customHealthSetting.value;
                        this._customHealthSettings.remove(customPieceCoordinates);
                    }

                    var customPieceLocation = boardTilesByCoordinates[customPieceCoordinates.signature];

                    if (!customPieceLocation.isOccupied()) {
                        customPiece.location.movePieceTo(customPieceLocation);
                        --customPiece.moveCount;
                    }
                }
            }
        }
    }
}