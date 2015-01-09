module AgileObjects.StrategyGame.Game.Pieces {

    export module NullPieceLocation {

        var noInteractions = new Array<IPieceInteraction>(0);

        class NullPieceLocation implements IPieceLocation {
            piece: Piece;
            owner: IPieceOwner;
            coordinates = TypeScript.Coordinates.EMPTY;
            wasPartOfLastMove = false;

            isOccupied(): boolean { return false; }
            isSelected(): boolean { return false; }
            add(): void { }
            contains(): boolean { return false; }
            movePieceThrough(): void { }

            potentialInteractions(interactions?: Array<IPieceInteraction>): Array<IPieceInteraction> {
                return noInteractions;
            }
        }

        export var INSTANCE: IPieceLocation = new NullPieceLocation();
    }
} 