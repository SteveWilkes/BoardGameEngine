module AgileObjects.BoardGameEngine.Games {
    import Ts = TypeScript;

    export class GameWrapper<TTeamConfigurator extends ITeamConfigurator> {
        constructor(private _teamConfigurator: TTeamConfigurator, private _game: Game) {
            this.teams = this._game.teams;
            this.events = this._game.events;
            this.status = this._game.status;
        }

        public teams: Array<T.Team>;
        public events: G.GameEventSet;
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

            this._teamConfigurator.setupTeams();

            return this;
        }
    }
}