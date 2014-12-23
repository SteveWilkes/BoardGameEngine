module AgileObjects.StrategyGame.Game {

    export class EventSet {
        public containerResized = new TypeScript.EventHub<Boards.Board>();

        public turnStarted = new TypeScript.EventHub<Teams.Team>();
        public pieceSelected = new TypeScript.EventHub<Pieces.Piece>();
        public pieceMoving = new TypeScript.EventHub<Pieces.Piece>();
        public pieceDeselected = new TypeScript.EventHub<Pieces.Piece>();
        public pieceMoved = new TypeScript.EventHub<Pieces.PieceMovement>();
    }
} 