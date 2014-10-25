module AgileObjects.StrategyGame.Game {

    export class BoardTile {
        constructor(public position: Coordinates) {
            this.isDark = (position.isEvenRow && position.isEvenColumn) || (!position.isEvenRow && !position.isEvenColumn);
        }

        public piece: IPiece;
        public isDark: boolean;
        public isPotentialDestination: boolean;
        public size: number;

        public resize(sizeSet: BoardSizeSet): void {
            this.size = sizeSet.tileSize;

            if (this.isOccupied()) {
                this.piece.resize(sizeSet);
            }
        }

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public add(piece: IPiece): void {
            console.log("Piece " + piece.id + " assigned");
            this.piece = piece;
        }

        public movePieceTo(destinationTile: BoardTile): void {
            var piece = this.piece;
            this.piece = undefined;

            destinationTile.add(piece);
        }
    }
}