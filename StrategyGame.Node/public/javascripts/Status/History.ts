module AgileObjects.StrategyGame.Game.Status {

    export class History {
        constructor(events: EventSet) {
            events.pieceMoved.subscribe(movement => this._recordPieceMovement(movement));

            this.actions = new Array<IGameAction>();
        }

        public actions: Array<IGameAction>;

        private _recordPieceMovement(movement: Pieces.PieceMovement): boolean {
            this.actions.push(new PieceMoveAction(movement));
            return true;
        }
    }
} 