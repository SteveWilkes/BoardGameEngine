module AgileObjects.BoardGameEngine.Boards {

    // Elements 0 -> 5 in the trasform matrix are for perspective:
    var rotationRadiansIndex = 6;

    "ClientOnly";
    export class BoardDisplayDataService {
        constructor(private _$windowService: ng.IWindowService) { }

        public getData(): BoardDisplayData {
            var containerSize = Math.min(this._$windowService.innerWidth, this._$windowService.innerHeight);
            var boardElement = this._$windowService.document.getElementById("board");
            var minWidth = parseInt(boardElement.style.minWidth) || 300;
            var degreeOfRotation = this._getBoardRotation(boardElement);
            return new BoardDisplayData(containerSize, minWidth, degreeOfRotation);
        }

        private _getBoardRotation(boardElement: HTMLElement): number {
            var boardStyles = this._$windowService.getComputedStyle(boardElement);
            var boardTransform =
                boardStyles.transform ||
                boardStyles.getPropertyValue("-webkit-transform") ||
                boardStyles.getPropertyValue("-moz-transform") ||
                boardStyles.getPropertyValue("-ms-transform") ||
                boardStyles.getPropertyValue("-o-transform");
            if (!boardTransform) { return 0; }
            boardTransform = boardTransform.substring(boardTransform.indexOf("(") + 1);
            var boardTransformValues = boardTransform.substring(0, boardTransform.length - 1).split(",");
            var sinOfRotationInRadians = parseFloat(boardTransformValues[rotationRadiansIndex]);
            var rotationInRadians = Math.asin(sinOfRotationInRadians);
            return rotationInRadians;
        }
    }
} 