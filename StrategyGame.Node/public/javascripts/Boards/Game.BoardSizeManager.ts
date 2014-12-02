module AgileObjects.StrategyGame.Game {

    export class BoardSizeManager {
        /** Initialises a new instance of the BoardSizeManager class. */
        constructor(private _defaults: BoardSizeDefaults, private _container: BoardContainer, events: EventSet) {
            events.containerResized.subscribe((board: Board) => this.resize(board));
        }

        /** Gets the number of pixels from the top of the window at which the board will be placed. */
        public boardTopOffset: string;

        /** Gets the width of the board in pixels. */
        public boardSize: number;

        /** Gets the width / height of a board tile in pixels. */
        public tileSize: number;

        /** Gets the width of a piece image in pixels. */
        public pieceWidth: number;

        /** Gets the height of a piece image in pixels. */
        public pieceHeight: number;

        /** Scales the board and all pieces to the current window size. */
        public resize(board: Board): boolean {
            if (board === undefined) { return false; }
            var containerSize = this._container.getSize();
            this.boardTopOffset = Math.floor(containerSize * 0.05) + "px";
            this.boardSize = Math.floor(containerSize * 0.9);
            var tileOuterSize = Math.floor(this.boardSize / board.type.gridSize);
            this.tileSize = tileOuterSize - (this._defaults.tileBorderWidth * 2);
            var resizeFactor = containerSize / this._defaults.containerSize;
            this.pieceWidth = Math.floor(this._defaults.pieceWidth * resizeFactor);
            this.pieceHeight = Math.floor(this._defaults.pieceHeight * resizeFactor);

            return true;
        }
    }
}