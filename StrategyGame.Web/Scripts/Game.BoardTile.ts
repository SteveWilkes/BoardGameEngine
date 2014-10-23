module AgileObjects.StrategyGame.Game {

    export class BoardTile {
        constructor(public position: Coordinates) {
            this.isDark = (position.isEvenRow && position.isEvenColumn) || (!position.isEvenRow && !position.isEvenColumn);
        }

        public piece: IPiece;
        public isDark: boolean;
        public isPotentialDestination: boolean;
        public size: number;

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