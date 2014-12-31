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

        public add(piece: Pieces.Piece): void {
            piece.setLocation(this);
        }

        public isPotentialDestination(): boolean {
            return this.potentialInteraction().type === Pieces.InteractionType.Move;
        }

        public isPotentialAttackTarget(): boolean {
            return this.potentialInteraction().type === Pieces.InteractionType.Attack;
        }
    }
}