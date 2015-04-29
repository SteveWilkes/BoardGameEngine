module AgileObjects.BoardGameEngine.Status {

    export class TurnManager {
        private _teams: Array<T.Team>;

        constructor(turnInteractions: Array<P.InteractionType>, private _game: G.Game) {
            this._game.events.gameStarted.subscribe((team, eventData) => this._setStartingTeam(team, eventData));
            this._game.events.teamAdded.subscribe(data => this._teams.push(data.team) > 0);
            this._game.events.teamRemoved.subscribe(team => this._teams.remove(team) === void (0));
            this._game.events.pieceMoving.subscribe(piece => this._verifyPieceIsMovable(piece));
            this._game.events.turnValidated.subscribe((team, eventData) => this._turnValidated(team, eventData));

            this.regulator = new TurnRegulator(turnInteractions, this._game);
            this._teams = new Array<T.Team>();
        }

        public currentTeam: T.Team;
        public regulator: P.IPieceInteractionRegulator;

        private _setStartingTeam(team: T.Team, eventData: Ts.EventCallbackSet): boolean {
            this.setCurrentTeam(team);

            eventData.whenEventCompletes(() => this._turnStarted());

            return true;
        }

        private _verifyPieceIsMovable(piece: P.Piece): boolean {
            return this.currentTeam.owner.isLocal && this.currentTeam.owns(piece);
        }

        private _turnValidated(nextTeam: Teams.Team, eventData: Ts.EventCallbackSet): boolean {
            this.setCurrentTeam(nextTeam);

            eventData.whenEventCompletes(() => this._turnStarted());

            return true;
        }

        private setCurrentTeam(team: Teams.Team) {
            this.currentTeam = team;
        }

        private _turnStarted(): boolean {
            return this._game.events.turnStarted.publish(this.currentTeam);
        }
    }
} 