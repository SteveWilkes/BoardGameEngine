module AgileObjects.StrategyGame.Game.Boards {
    import Pieces = StrategyGame.Game.Pieces;

    export class BoardTile extends Pieces.PieceLocationBase {
        constructor(coordinates: TypeScript.Coordinates, events: GameEventSet) {
            super(events);

            this.coordinates = coordinates;
            this.isDark = (coordinates.isEvenRow && coordinates.isEvenColumn) || (!coordinates.isEvenRow && !coordinates.isEvenColumn);
        }

        public isGameTile = true;
        public isDark: boolean;
        public wasAttacked = false;

        public add(piece: Pieces.Piece): void {
            piece.setLocation(this);
        }

        public isPotentialDestination(): boolean {
            return this._hasPotentialInteractionOfType(Pieces.InteractionType.Move);
        }

        public isPotentialAttackTarget(): boolean {
            return this._hasPotentialInteractionOfType(Pieces.InteractionType.Attack);
        }

        private _hasPotentialInteractionOfType(type: Pieces.InteractionType): boolean {
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