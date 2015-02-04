module AgileObjects.BoardGameEngine.Status {

    export class TurnManager {
        private _teams: Array<Teams.Team>;

        constructor(turnInteractions: Array<Pieces.InteractionType>, private _events: Games.GameEventSet) {
            this._events.gameStarted.subscribe((team, eventData) => this._setStartingTeam(team, eventData));
            this._events.teamAdded.subscribe(team => this._teams.push(team) > 0);
            this._events.pieceMoving.subscribe(piece => this._verifyPieceIsMovable(piece));
            this._events.turnValidated.subscribe((team, eventData) => this._turnValidated(team, eventData));

            this.regulator = new TurnRegulator(turnInteractions, this._events);
            this._teams = new Array<Teams.Team>();
        }

        public currentTeam: Teams.Team;
        public regulator: Pieces.IPieceInteractionRegulator;

        private _setStartingTeam(team: Teams.Team, eventData: TypeScript.EventCallbackSet): boolean {
            this.setCurrentTeam(team);

            eventData.whenEventCompletes(() => this._turnStarted());

            return true;
        }

        private _verifyPieceIsMovable(piece: Pieces.Piece): boolean {
            return this.currentTeam.owner.isLocal && this.currentTeam.owns(piece);
        }

        private _turnValidated(nextTeam: Teams.Team, eventData: TypeScript.EventCallbackSet): boolean {
            this.setCurrentTeam(nextTeam);

            eventData.whenEventCompletes(() => this._turnStarted());

            return true;
        }

        private setCurrentTeam(team: Teams.Team) {
            this.currentTeam = team;
        }

        private _turnStarted(): boolean {
            return this._events.turnStarted.publish(this.currentTeam);
        }
    }
} 