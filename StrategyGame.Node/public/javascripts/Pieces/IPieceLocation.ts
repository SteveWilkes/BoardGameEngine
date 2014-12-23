﻿module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: TypeScript.Coordinates;
        isOccupied(): boolean;
        add(piece: Piece): void;
        piece: Piece;
        movePieceTo(destination: IPieceLocation): void;
        setPotentialDestination(switchOn: boolean): void;
        potentialAttack: PieceAttack;
        wasPartOfLastMove: boolean;
    }

    export class PieceLocationBase implements IPieceLocation {
        constructor(private _events: EventSet) { }

        public coordinates: TypeScript.Coordinates;
        public piece: Pieces.Piece;
        public potentialAttack: PieceAttack;
        public wasPartOfLastMove: boolean;

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public add(piece: Piece): void { }

        public movePieceTo(destination: Pieces.IPieceLocation): void {
            var piece = this.piece;
            this.piece = undefined;

            destination.add(piece);

            this._events.pieceMoved.publish(new Pieces.PieceMovement(this, destination));
        }

        public setPotentialDestination(switchOn: boolean): void { }
    }
} 