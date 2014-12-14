module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Pieces = StrategyGame.Game.Pieces;

    export class EventSet {
        public containerResized = new TypeScript.EventHub<Boards.Board>();

        public pieceSelected = new TypeScript.EventHub<Pieces.IPieceLocation>();
        public pieceMoving = new TypeScript.EventHub<Pieces.IPieceLocation>();
        public pieceMoved = new TypeScript.EventHub<Pieces.IPieceLocation>();
        public pieceDeselected = new TypeScript.EventHub<Pieces.IPieceLocation>();
    }
} 