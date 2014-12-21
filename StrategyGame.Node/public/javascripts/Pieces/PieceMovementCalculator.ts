module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementCalculator {
        constructor(private _directionFunctionName: string, private _distance: number) { }

        public applyMovement(startingPoint: TypeScript.Coordinates): TypeScript.Coordinates {
            return startingPoint[this._directionFunctionName](this._distance);
        }
    }
}