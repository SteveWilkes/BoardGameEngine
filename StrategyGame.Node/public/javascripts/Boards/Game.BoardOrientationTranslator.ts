module AgileObjects.StrategyGame.Game.Boards {

    export class BoardOrientationTranslator {
        private _focusPosition: BoardPosition;

        constructor() {
        }

        public setFocusPosition(focusPosition: BoardPosition): void {
            this._focusPosition = focusPosition;
        }

        public focusPositionIs(position: BoardPosition) {
            return position === this._focusPosition;
        }

        public translate(coordinates: Coordinates, subjectTeamPosition: BoardPosition): Coordinates {
            return coordinates;
        }
    }
}