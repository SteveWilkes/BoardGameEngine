﻿module AgileObjects.TypeScript {

    export class CoordinateTranslator {
        constructor(private _directionFunctionName: string, private _distance: number) { }

        public translate(startingPoint: Coordinates): Array<Coordinates> {
            return startingPoint[this._directionFunctionName](this._distance);
        }
    }
}