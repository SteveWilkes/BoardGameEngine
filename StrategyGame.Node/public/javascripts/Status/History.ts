module AgileObjects.StrategyGame.Status {

    export class History {
        constructor(events: Games.GameEventSet) {
            events.pieceMoved.subscribe(movement => this._recordPieceMovement(movement));
            events.pieceAttacked.subscribe(attack => this._recordPieceAttack(attack));

            this.actions = new Array<Pieces.IGameAction>();
        }

        public actions: Array<Pieces.IGameAction>;
        public lastMove: Pieces.PieceMovement;

        private _recordPieceMovement(movement: Pieces.PieceMovement): boolean {
            // BUG: Bomb movements logged as destination -> destination
            if (this.lastMove !== undefined) {
                this.lastMove.setWasPartOfLastMove(false);
            }
            this.lastMove = movement;
            movement.setWasPartOfLastMove(true);
            this.actions.push(movement);
            return true;
        }

        private _recordPieceAttack(attack: Pieces.PieceAttack): boolean {
            this.actions.push(attack);
            return true;
        }
    }
} 