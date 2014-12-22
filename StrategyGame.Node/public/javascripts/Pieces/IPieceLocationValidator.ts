module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationValidator {
        isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean
    }

    export class IsOccupiedLocationValidator implements IPieceLocationValidator {
        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return potentialLocation.isOccupied();
        }
    }

    export class IsUnoccupiedLocationValidator implements IPieceLocationValidator {
        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return !potentialLocation.isOccupied();
        }
    }

    export class IsDroppableLocationValidator implements IPieceLocationValidator {
        constructor(
            private _sameTeamDroppablePieceDefinitionIds: Array<string>,
            private _otherTeamDroppablePieceDefinitionIds: Array<string>) { }

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            var isSameTeam = potentialLocation.piece.team === subjectPiece.team;

            var allowedPieceDefinitionIds = isSameTeam
                ? this._sameTeamDroppablePieceDefinitionIds
                : this._otherTeamDroppablePieceDefinitionIds;

            return allowedPieceDefinitionIds.indexOf(potentialLocation.piece.definitionId) > -1;
        }
    }

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

    /** Judges an IPieceLocation as valid if all the IPieceLocations of which it is composed are valid. */
    export class CompositeAllPieceLocationValidator implements IPieceLocationValidator {
        constructor(private _validators: Array<IPieceLocationValidator>) { }

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            for (var i = 0; i < this._validators.length; i++) {
                if (!this._validators[i].isValid(potentialLocation, subjectPiece)) {
                    return false;
                }
            }
            return true;
        }
    }
}