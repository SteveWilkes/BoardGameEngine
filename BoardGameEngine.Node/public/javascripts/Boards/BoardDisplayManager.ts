﻿module AgileObjects.BoardGameEngine.Boards {

    "ClientOnly";
    export class BoardDisplayManager implements Ui.IClientComponent {
        private _boardDisplayDataService: BoardDisplayDataService;

        /** Initialises a new instance of the BoardDisplayManager class. */
        constructor(windowService: ng.IWindowService) {
            this._boardDisplayDataService = new Boards.BoardDisplayDataService(windowService);

            GlobalEventSet.instance.containerResized.subscribe((board: Board) => this.resize(board));
        }

        /** Gets the number of pixels from the top of the window at which the board will be placed. */
        public boardTopOffset: number;

        /** Gets the width of the board in pixels. */
        public boardSize: number;

        /** Gets the width / height of a board tile in pixels. */
        public tileSize: number;

        /** Gets the width of a piece image in pixels. */
        public pieceWidth: number;

        /** Gets the height of a piece image in pixels. */
        public pieceHeight: number;

        public initialise(game: Games.Game): void {
            this.resize(game.board);
        }

        /** Scales the board and all pieces to the current window size. */
        public resize(board: Board): boolean {
            if (board === undefined) { return false; }
            var boardDisplayData = this._boardDisplayDataService.getData();
            this.boardTopOffset = this._calculateBoardTopOffset(boardDisplayData);
            this.boardSize = Math.max(this._calculateBoardSize(boardDisplayData), boardDisplayData.minWidth);
            // ReSharper disable once QualifiedExpressionMaybeNull
            var tileOuterSize = Math.floor(this.boardSize / board.type.gridSize);
            this.tileSize = tileOuterSize - (BoardSizeDefaults.INSTANCE.tileBorderWidth * 2);
            var resizeFactor = this.boardSize / BoardSizeDefaults.INSTANCE.boardSize;
            this.pieceWidth = Math.floor(BoardSizeDefaults.INSTANCE.pieceWidth * resizeFactor);
            this.pieceHeight = Math.floor(BoardSizeDefaults.INSTANCE.pieceHeight * resizeFactor);

            return true;
        }

        private _calculateBoardTopOffset(boardDisplayData: BoardDisplayData): number {
            if (boardDisplayData.radiansOfRotation === 0) {
                return Math.floor(boardDisplayData.containerSize * .05);
            }
            var marginPercentage = boardDisplayData.containerSize / 100;
            var margin = Math.floor(marginPercentage * marginPercentage);
            return -margin;
        }

        private _calculateBoardSize(boardDisplayData: BoardDisplayData) {
            if (boardDisplayData.radiansOfRotation === 0) {
                return Math.floor(boardDisplayData.containerSize * .9);
            }
            var containerPercentage = .85;
            if (boardDisplayData.containerSize < 1024) {
                containerPercentage += Math.round(1024 / boardDisplayData.containerSize) / 100;
            }
            var percentageOfContainer = boardDisplayData.containerSize * containerPercentage;
            var viewportSize = Math.cos(boardDisplayData.radiansOfRotation) * percentageOfContainer;
            var viewportSizeRatio = percentageOfContainer / viewportSize;
            var boardSize = Math.floor(percentageOfContainer * viewportSizeRatio);
            return boardSize;
        }
    }
}