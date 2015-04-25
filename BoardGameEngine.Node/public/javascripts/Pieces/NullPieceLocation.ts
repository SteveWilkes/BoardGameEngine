module AgileObjects.BoardGameEngine.Pieces {

    var noInteractions = new Array<IPieceInteraction>(0);

    export class NullPieceLocation implements IPieceLocation {
        static INSTANCE = new NullPieceLocation();

        public piece: Piece;
        public owner: IPieceOwner;
        public coordinates = TypeScript.Coordinates.EMPTY;
        public wasPartOfLastMove = false;

        public isOccupied(): boolean { return false; }

        public isSelected(): boolean { return false; }

        public add(): void { }

        public contains(): boolean { return false; }

        public movePieceTo(): void { }

        public potentialInteractions(interactions?: Array<IPieceInteraction>): Array<IPieceInteraction> {
            return noInteractions;
        }
    }
} 