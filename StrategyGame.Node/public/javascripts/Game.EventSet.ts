module AgileObjects.StrategyGame.Game {
    export class EventSet {
        public containerResized = new TypeScript.EventHub<Board>();

        public pieceSelected = new TypeScript.EventHub<IPieceLocation>();
        public pieceMoving = new TypeScript.EventHub<IPieceLocation>();
        public pieceMoved = new TypeScript.EventHub<IPieceLocation>();
        public pieceDeselected = new TypeScript.EventHub<IPieceLocation>();
    }
} 