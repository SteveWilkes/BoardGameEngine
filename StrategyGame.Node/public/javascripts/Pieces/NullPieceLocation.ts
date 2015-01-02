module AgileObjects.StrategyGame.Game.Pieces {

    export module NullPieceLocation {
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

            potentialInteraction(interaction?: IPieceInteraction): IPieceInteraction {
                return NullPotentialInteraction.INSTANCE;
            }
        }

        export var INSTANCE: IPieceLocation = new NullPieceLocation();
    }
} 