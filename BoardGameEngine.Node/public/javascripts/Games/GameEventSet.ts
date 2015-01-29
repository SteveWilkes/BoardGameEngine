module AgileObjects.BoardGameEngine.Games {

    export class GameEventSet {
        public playerJoined = new TypeScript.EventHub<Players.Player>();
        public teamAdded = new TypeScript.EventHub<Teams.Team>();

        public gameStarted = new TypeScript.EventHub<Teams.Team>();
        public turnStarted = new TypeScript.EventHub<Pieces.IPieceOwner>();
        public locationSelected = new TypeScript.EventHub<Pieces.IPieceLocation>();
        public pieceSelected = new TypeScript.EventHub<Pieces.Piece>();
        public pieceMoving = new TypeScript.EventHub<Pieces.Piece>();
        public pieceDeselected = new TypeScript.EventHub<Pieces.Piece>();
        public pieceMoved = new TypeScript.EventHub<Pieces.PieceMovement>();
        public pieceAttacked = new TypeScript.EventHub<Pieces.PieceAttack>();
        public pieceTaken = new TypeScript.EventHub<Pieces.Piece>();
        public turnValidated = new TypeScript.EventHub<Teams.Team>();
        public turnEnded = new TypeScript.EventHub<Pieces.IPieceOwner>();
    }
} 