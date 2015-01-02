module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceLocationBase implements IPieceLocation {
        private _potentialInteraction: IPieceInteraction;
        private _isSelected: boolean;

        constructor(private _events: GameEventSet) {
            this._potentialInteraction = NullPotentialInteraction.INSTANCE;
        }

        public coordinates: TypeScript.Coordinates;
        public piece: Piece;
        public owner: IPieceOwner;
        public wasPartOfLastMove: boolean;

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }

        public isSelected(newValue?: boolean): boolean {
            if (newValue !== undefined) { this._isSelected = newValue; }
            return this._isSelected;
        }

        public add(piece: Piece): void {
            throw new Error("Abstract PieceLocationBase.add method not implemented");
        }

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