module AgileObjects.StrategyGame.Game {

    export class AnyDirectionMovementProfile implements IPieceMovementProfile {
        constructor(private _allowedDistance: number) {
        }

        public getPossibleDestinations(origin: Coordinates): Array<Coordinates> {
            return [
                origin.left(this._allowedDistance),
                origin.upLeft(this._allowedDistance),
                origin.up(this._allowedDistance),
                origin.upRight(this._allowedDistance),
                origin.right(this._allowedDistance),
                origin.downRight(this._allowedDistance),
                origin.down(this._allowedDistance),
                origin.downLeft(this._allowedDistance)
            ];
        }
    }
}