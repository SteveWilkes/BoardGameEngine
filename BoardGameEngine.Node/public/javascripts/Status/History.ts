module AgileObjects.BoardGameEngine.Status {

    export class History {
        private _previousMovement: P.PieceMovement;

        constructor(events: G.GameEventSet) {
            events.pieceMoved.subscribe(movement => this._recordPieceMovement(movement) === void (0));
            events.pieceAttacked.subscribe(attack => this._record(attack) === void (0));

            this.actions = new Array<I.IGameAction>();
        }

        public actions: Array<I.IGameAction>;
        public previousAction: I.IGameAction;

        private _recordPieceMovement(movement: P.PieceMovement): void {
            // BUG: Bomb movements logged as destination -> destination
            if (this._previousMovement !== undefined) {
                this._previousMovement.setWasPartOfLastMove(false);
            }
            this._previousMovement = movement;
            movement.setWasPartOfLastMove(true);
            this._record(movement);
        }

        private _record(action: I.IGameAction): void {
            this.previousAction = action;
            this.actions.push(action);
        }
    }
} 