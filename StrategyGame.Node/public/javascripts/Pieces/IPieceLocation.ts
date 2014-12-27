module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: TypeScript.Coordinates;
        isOccupied(): boolean;
        isSelected(newValue?: boolean): boolean;
        add(piece: Piece): void;
        contains(location: IPieceLocation): boolean;
        piece: Piece;
        movePieceTo(destination: IPieceLocation): void;
        potentialInteraction(interaction?: IPieceInteraction): IPieceInteraction;
        wasPartOfLastMove: boolean;
    }

    export module NullPotentialInteraction {
        class NullPotentialInteraction implements IPieceInteraction {
            public type: InteractionType;
            public location = <IPieceLocation>{
                coordinates: undefined,
                piece: undefined,
                wasPartOfLastMove: false,
                potentialInteraction: () => { return undefined; },
                add: () => { },
                isSelected: () => false,
                contains: () => false,
                isOccupied: () => false,
                movePieceTo: () => false
            };
            public complete(): void { }
        }

        export var instance = new NullPotentialInteraction();
    }

    export class PieceLocationBase implements IPieceLocation {
        private _potentialInteraction: IPieceInteraction;
        private _isSelected: boolean;

        constructor(private _events: EventSet) {
            this._potentialInteraction = NullPotentialInteraction.instance;
        }

        public coordinates: TypeScript.Coordinates;
        public piece: Pieces.Piece;
        public wasPartOfLastMove: boolean;

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public isSelected(newValue?: boolean): boolean {
            if (newValue !== undefined) { this._isSelected = newValue; }
            return this._isSelected;
        }

        public add(piece: Piece): void { }

        public contains(location: IPieceLocation): boolean {
            if (location === this) { return true; }
            return this.isOccupied() && this.piece.contains(location);
        }

        public movePieceTo(destination: Pieces.IPieceLocation): void {
            var piece = this.piece;
            this.piece = undefined;

            destination.add(piece);

            this._events.pieceMoved.publish(new Pieces.PieceMovement(this, destination));
        }

        public potentialInteraction(interaction?: IPieceInteraction): IPieceInteraction {
            if (interaction !== undefined) {
                this._potentialInteraction = interaction;
            }
            return this._potentialInteraction;
        }
    }
} 