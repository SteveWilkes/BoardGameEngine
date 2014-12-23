module AgileObjects.StrategyGame.Game.Boards {
    import Pieces = StrategyGame.Game.Pieces;

    export class BoardTile extends Pieces.PieceLocationBase {
        constructor(coordinates: TypeScript.Coordinates, events: EventSet) {
            super(events);

            this.coordinates = coordinates;
            this.isDark = (coordinates.isEvenRow && coordinates.isEvenColumn) || (!coordinates.isEvenRow && !coordinates.isEvenColumn);
        }

        public isGameTile = true;
        public isDark: boolean;
        public isPotentialDestination: boolean;

        public add(piece: Pieces.Piece): void {
            if (this.isOccupied()) {
                this.piece.pieceDropHandler.handleDrop(piece);
            } else {
                piece.setLocation(this);
            }
        }

        public setPotentialDestination(switchOn: boolean): void {
            this.isPotentialDestination = switchOn;
        }
    }
}