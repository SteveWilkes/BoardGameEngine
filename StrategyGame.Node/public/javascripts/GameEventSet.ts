module AgileObjects.StrategyGame.Game {

    export class GameEventSet {
        public playerAdded = new TypeScript.EventHub<Players.IPlayer>();
        public teamAdded = new TypeScript.EventHub<Teams.Team>();

        public gameStarted = new TypeScript.EventHub<Teams.Team>();
        public turnStarted = new TypeScript.EventHub<Teams.Team>();
        public pieceSelected = new TypeScript.EventHub<Pieces.Piece>();
        public pieceMoving = new TypeScript.EventHub<Pieces.Piece>();
        public pieceDeselected = new TypeScript.EventHub<Pieces.Piece>();
        public pieceMoved = new TypeScript.EventHub<Pieces.PieceMovement>();
        public pieceTaken = new TypeScript.EventHub<Pieces.Piece>();
    }
} 