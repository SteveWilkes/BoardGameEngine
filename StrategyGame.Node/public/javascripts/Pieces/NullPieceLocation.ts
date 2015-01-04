module AgileObjects.StrategyGame.Game.Pieces {

    export module NullPieceLocation {

        var noInteractions = new Array<IPieceInteraction>(0);

        class NullPieceLocation implements IPieceLocation {
            piece: Piece;
            owner: IPieceOwner;
            coordinates = TypeScript.Coordinates.EMPTY;
            wasPartOfLastMove = false;

            isOccupied(): boolean { return false; }
            isSelected(newValue?: boolean): boolean { return false; }
            add(piece: Piece): void { }
            contains(location: IPieceLocation): boolean { return false; }
            movePieceTo(destination: IPieceLocation): void { }

            potentialInteractions(interactions?: Array<IPieceInteraction>): Array<IPieceInteraction> {
                return noInteractions;
            }
        }

        export var INSTANCE: IPieceLocation = new NullPieceLocation();
    }
} 