module AgileObjects.StrategyGame.Game {

    export class BoardTile {
        constructor(public position: Coordinates) {
            this.isDark = (position.isEvenRow && position.isEvenColumn) || (!position.isEvenRow && !position.isEvenColumn);
        }

        public size: number;
        public isDark: boolean;
        public piece: IPiece;

        public resize(newSize: number, resizeFactor: number): void {
            this.size = newSize;

            if (this.isOccupied()) {
                this.piece.resize(resizeFactor);
            }
        }

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public assign(piece: IPiece): void {
            console.log("Piece " + piece.id + " assigned");
            this.piece = piece;
        }

        public pieceMovedTo(destinationTile: BoardTile): void {
            var piece = this.piece;
            this.piece = undefined;

            destinationTile.assign(piece);
        }
    }
}