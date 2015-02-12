module AgileObjects.BoardGameEngine.Boards {
    import Pieces = BoardGameEngine.Pieces;

    export class BoardTile extends Pieces.PieceLocationBase {
        constructor(coordinates: TypeScript.Coordinates) {
            super();

            this.coordinates = coordinates;
            this.isDark = (coordinates.isEvenRow && coordinates.isEvenColumn) || (!coordinates.isEvenRow && !coordinates.isEvenColumn);
        }

        public isGameTile = true;
        public isDark: boolean;

        public add(piece: Piece): void {
            piece.setLocation(this);
        }

        public isPotentialDestination(): boolean {
            return this._hasPotentialInteractionOfType(InteractionType.move);
        }

        public isPotentialAttackTarget(): boolean {
            return this._hasPotentialInteractionOfType(InteractionType.attack);
        }

        private _hasPotentialInteractionOfType(type: InteractionType): boolean {
            var potentialInteractions = this.potentialInteractions();
            for (var i = 0; i < potentialInteractions.length; i++) {
                if (potentialInteractions[i].type === type) {
                    return true;
                }
            }
            return false;
        }
    }
}