module AgileObjects.StrategyGame.Game {

    export class PieceMover {
        private _currentPieceMovement: PieceMovement;

        constructor(private _locationsByCoordinates: IPieceLocationDictionary) {
        }

        public pieceSelected(origin: IPieceLocation) {
            var validDestinations = origin.piece.movementProfile.getValidDestinations(origin, this._locationsByCoordinates);
            this._currentPieceMovement = new PieceMovement(origin, validDestinations);
        }

        public pieceMoved(destination: IPieceLocation): boolean {
            return this._currentPieceMovement.complete(destination);
        }

        public pieceDeselected(): boolean {
            this._currentPieceMovement.cancel();
            return true;
        }
    }
}