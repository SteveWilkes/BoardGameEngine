module AgileObjects.BoardGameEngine.Games {

    export class GameEventSet {
        public playerJoined = new TypeScript.EventHub<Pl.Player>();
        public teamAdded = new TypeScript.EventHub<B.TeamAdditionData>();
        public teamRemoved = new TypeScript.EventHub<T.Team>();

        public gameStarted = new TypeScript.EventHub<T.Team>();
        public turnStarted = new TypeScript.EventHub<P.IPieceOwner>();
        public locationSelected = new TypeScript.EventHub<P.IPieceLocation>();
        public pieceSelected = new TypeScript.EventHub<Piece>();
        public pieceMoving = new TypeScript.EventHub<Piece>();
        public pieceDeselected = new TypeScript.EventHub<Piece>();
        public pieceMoved = new TypeScript.EventHub<P.PieceMovement>();
        public pieceAttacked = new TypeScript.EventHub<P.PieceAttack>();
        public pieceTaken = new TypeScript.EventHub<Piece>();
        public turnValidated = new TypeScript.EventHub<T.Team>();
        public turnEnded = new TypeScript.EventHub<P.IPieceOwner>();
        public teamDefeated = new TypeScript.EventHub<T.Team>();
        public gameWon = new TypeScript.EventHub<T.Team>();
    }
} 