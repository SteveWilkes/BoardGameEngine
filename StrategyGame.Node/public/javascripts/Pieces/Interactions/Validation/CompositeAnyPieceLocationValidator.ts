﻿module AgileObjects.StrategyGame.Game.Pieces {

    /** Judges an IPieceLocation as valid if any of the IPieceLocations of which it is composed are valid. */
    export class CompositeAnyPieceLocationValidator implements IPieceLocationValidator {
        constructor(private _validators: Array<IPieceLocationValidator>) { }

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            for (var i = 0; i < this._validators.length; i++) {
                if (this._validators[i].isValid(potentialLocation, subjectPiece)) {
                    return true;
                }
            }
            return false;
        }
    }
}