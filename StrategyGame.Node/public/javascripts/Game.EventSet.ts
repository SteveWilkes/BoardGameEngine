module AgileObjects.StrategyGame.Game {
    export class EventSet {
        public containerResized = new AgileObjects.TypeScript.EventHub<Board>();

        public pieceSelected = new AgileObjects.TypeScript.EventHub<IPieceLocation>();
        public pieceMoving = new AgileObjects.TypeScript.EventHub<IPieceLocation>();
        public pieceMoved = new AgileObjects.TypeScript.EventHub<IPieceLocation>();
        public pieceDeselected = new AgileObjects.TypeScript.EventHub<IPieceLocation>();
    }
} 