module AgileObjects.BoardGameEngine.Games {
    import Ts = TypeScript;

    export class RunTheBombTeamConfigurator implements G.ITeamConfigurator {
        private _configurations: Ts.Dictionary<T.Team, Array<P.PieceConfigData>>;

        constructor(private _game: G.Game) {
            this._configurations = new Ts.Dictionary<T.Team, Array<P.PieceConfigData>>();
        }

        public forTeam(teamNumber: number): RunTheBombTeamConfigurator {
            var team = this._game.teams[teamNumber - 1];
            this._configurations.add(team, new Array<P.PieceConfigData>());

            return this;
        }

        public withTheBomb(): RunTheBombTeamConfigurator {
            var currentConfigDataSet = this._configurations.values[this._configurations.values.length - 1];
            var mostRecentConfigData = currentConfigDataSet[currentConfigDataSet.length - 1];
            return this.aBombAt(mostRecentConfigData.pieceCoordinates.signature);
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

        private _addPieces(pieceDefinitionId: string, coordinatesSignatures: Array<string>): RunTheBombTeamConfigurator {
            for (var i = 0; i < coordinatesSignatures.length; i++) {
                this._configurations.values[this._configurations.values.length - 1].push(
                    new Pieces.PieceConfigData(
                        pieceDefinitionId,
                        Ts.CoordinatesLibrary.INSTANCE.get(coordinatesSignatures[i])));
            }

            return this;
        }

        public setupTeams(): void {
            var teamFactory = new Teams.TeamFactory();
            var defaultPieceData = this._game.type.pieceData;
            var boardTilesByCoordinates = this._game.board.getTiles();
            for (var i = 0; i < this._configurations.keys.length; i++) {
                var team = this._configurations.keys[i];
                var teamNumber = i + 1;
                var configData = this._configurations.values[i];
                var pieceData = new Pieces.PieceDataSet(defaultPieceData.definitions, configData);
                var customTeam = teamFactory.createTeamFor(team.owner, teamNumber, pieceData);
                var customTeamPiecesById = customTeam.getPieces();
                var teamPiecesById = team.getPieces();

                for (var pieceId in customTeamPiecesById) {
                    var customPiece = customTeamPiecesById[pieceId];
                    teamPiecesById[pieceId] = customPiece;

                    var customPieceCoordinates = customTeam.getInitialCoordinatesFor(customPiece);
                    var customPieceLocation = boardTilesByCoordinates[customPieceCoordinates.signature];

                    while (customPieceLocation.isOccupied()) {
                        customPieceLocation = customPieceLocation.piece;
                    }

                    customPieceLocation.add(customPiece);
                }
            }
        }
    }
}