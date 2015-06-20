module AgileObjects.BoardGameEngine.Games {
    import Ts = TypeScript;

    export class GameWrapper<TTeamConfigurator extends ITeamConfigurator> {
        private _game: Game;

        constructor(private _gameFactory: GameFactory, private _teamConfigurator: TTeamConfigurator) { }

        public teams: Array<T.Team>;
        public events: GameEventSet;
        public status: Status.StatusData;

        public getPieceAt(coordinatesSignature: string): PieceWrapper {
            try {
                var piece = Ts.Joq
                    .select<Ts.IStringDictionary<P.Piece>>(this.teams, team => team.getPieces())
                    .select(pieces => Ts.Joq
                    .select<P.Piece>(pieces)
                    .firstOrDefault(piece => piece.location.coordinates.signature === coordinatesSignature))
                    .first(p => p !== null);

                return new PieceWrapper(piece);
            } catch (e) {
                throw new Error("No piece found at " + coordinatesSignature + ": " + e);
            }
        }

        public startNextTurn(): void {
            var nextTeamIndex = (this._game.status.turnManager.currentTeam === this.teams[0]) ? 1 : 0;
            this.events.turnValidated.publish(this.teams[nextTeamIndex]);
        }

        public setupPieces(configuration: (configurator: TTeamConfigurator) => void): GameWrapper<TTeamConfigurator> {
            configuration(this._teamConfigurator);

            this._game = this._createGame();

            this._teamConfigurator.setupTeams(this._game);

            return this;
        }

        private _createGame(): Game {
            var gameOwner = this._teamConfigurator.getGameOwner();
            var game = this._gameFactory.createNewGame("test", "run-the-bomb", gameOwner);

            this.teams = game.teams;
            this.events = game.events;
            this.status = game.status;

            return game;
        }

        public start(): void {
            this._game.start();
        }
    }
}