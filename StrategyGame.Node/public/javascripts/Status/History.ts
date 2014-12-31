module AgileObjects.StrategyGame.Game.Status {

    export class History {
        constructor(events: GameEventSet) {
            events.pieceMoved.subscribe(movement => this._recordPieceMovement(movement));

            this.actions = new Array<IGameAction>();
        }

        public actions: Array<IGameAction>;
        public lastMove: Pieces.PieceMovement;

        private _recordPieceMovement(movement: Pieces.PieceMovement): boolean {
            if (this.lastMove !== undefined) {
                this.lastMove.setWasPartOfLastMove(false);
            }
            this.lastMove = movement;
            movement.setWasPartOfLastMove(true);
            this.actions.push(new PieceMoveAction(this.lastMove));
            return true;
        }
    }
} 