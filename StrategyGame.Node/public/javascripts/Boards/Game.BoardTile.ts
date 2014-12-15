module AgileObjects.StrategyGame.Game.Boards {
    import Pieces = StrategyGame.Game.Pieces;

    export class BoardTile implements Pieces.IPieceLocation {
        constructor(public coordinates: TypeScript.Coordinates) {
            this.isDark = (coordinates.isEvenRow && coordinates.isEvenColumn) || (!coordinates.isEvenRow && !coordinates.isEvenColumn);
        }

        public isGameTile = true;
        public piece: Pieces.IPiece;
        public isDark: boolean;
        public isPotentialDestination: boolean;

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public add(piece: Pieces.IPiece): void {
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

        public replacePieceWith(newPiece: Pieces.IPiece): void {
            this.clear();
            this.add(newPiece);
        }

        public movePieceTo(destination: Pieces.IPieceLocation): void {
            var piece = this.piece;
            this.clear();

            destination.add(piece);
        }

        public clear(): void {
            this.piece = undefined;
        }
    }
}