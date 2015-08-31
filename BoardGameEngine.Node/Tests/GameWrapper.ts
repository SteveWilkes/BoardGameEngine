module AgileObjects.BoardGameEngine.Games {
    import Ts = TypeScript;

    export class GameWrapper<TTeamConfigurator extends ITeamConfigurator> {
        private _game: Game;

        constructor(private _gameFactory: GameFactory, private _teamConfigurator: TTeamConfigurator) { }

        public teams: Array<T.Team>;
        public events: GameEventSet;
        public status: Status.StatusData;

        public setupPieces(
            configuration: (configurator: TTeamConfigurator) => void,
            callback: (gw: GameWrapper<TTeamConfigurator>) => void): void {

            configuration(this._teamConfigurator);

            this._createGame((createError, game) => {
                if (createError) {
                    throw createError;
                }

                this._game = game;

                this._teamConfigurator.setupTeams(this._game);

                callback(this);
            });
        }

        private _createGame(callback: (err: Error, game?: Game) => void): void {
            var gameOwner = this._teamConfigurator.getGameOwner();

            this._gameFactory.createNewGame("test", "run-the-bomb", gameOwner,(createError, g) => {
                if (createError) {
                    return callback(createError);
                }

                this.teams = g.teams;
                this.events = g.events;
                this.status = g.status;

                callback(null, g);
            });
        }

        public start(): void {
            this._game.start();
        }

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
    }
}