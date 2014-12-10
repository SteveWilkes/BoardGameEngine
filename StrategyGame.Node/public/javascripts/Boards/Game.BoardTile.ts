module AgileObjects.StrategyGame.Game {

    export class BoardTile implements IPieceLocation {
        constructor(public coordinates: Coordinates) {
            this.isDark = (coordinates.isEvenRow && coordinates.isEvenColumn) || (!coordinates.isEvenRow && !coordinates.isEvenColumn);
        }

        public isGameTile = true;
        public piece: IPiece;
        public isDark: boolean;
        public isPotentialDestination: boolean;

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public add(piece: IPiece): void {
            if (this.isOccupied()) {
                this.piece.attach(piece);
            } else {
                this.piece = piece;
            }
        }

        public movePieceTo(destination: IPieceLocation): void {
            var piece = this.piece;
            this.clear();

            destination.add(piece);
        }

        public clear(): void {
            this.piece = undefined;
        }
    }
}