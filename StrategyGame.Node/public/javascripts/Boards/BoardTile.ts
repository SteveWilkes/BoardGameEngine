module AgileObjects.StrategyGame.Game.Boards {
    import Pieces = StrategyGame.Game.Pieces;

    export class BoardTile implements Pieces.IPieceLocation {
        constructor(public coordinates: TypeScript.Coordinates, private _events: EventSet) {
            this.isDark = (coordinates.isEvenRow && coordinates.isEvenColumn) || (!coordinates.isEvenRow && !coordinates.isEvenColumn);
        }

        public isGameTile = true;
        public piece: Pieces.Piece;
        public isDark: boolean;
        public isPotentialDestination: boolean;
        public potentialAttack: Pieces.PieceAttack;
        public wasPartOfLastMove: boolean;

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public add(piece: Pieces.Piece): void {
            if (this.isOccupied()) {
                this.piece.pieceDropHandler.handleDrop(piece);
            } else {
                piece.setLocation(this);
            }
        }

        public movePieceTo(destination: Pieces.IPieceLocation): void {
            var piece = this.piece;
            this.piece = undefined;

            destination.add(piece);

            this._events.pieceMoved.publish(new Pieces.PieceMovement(this, destination));
        }
    }
}