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

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public add(piece: Pieces.Piece): void {
            if (this.isOccupied()) {
                this.piece.pieceDropHandler.handleDrop(piece);
            } else {
                this.piece = piece;
                piece.location = this;
                if (piece.attachedPiece !== undefined) {
                    piece.attachedPiece.location = this;
                }
            }
        }

        public replacePieceWith(newPiece: Pieces.Piece): void {
            this.clear();
            this.add(newPiece);
        }

        public movePieceTo(destination: Pieces.IPieceLocation): void {
            var piece = this.piece;
            this.clear();

            destination.add(piece);

            this._events.pieceMoved.publish(new Pieces.PieceMovement(this, destination));
        }

        public clear(): void {
            this.piece = undefined;
        }
    }
}