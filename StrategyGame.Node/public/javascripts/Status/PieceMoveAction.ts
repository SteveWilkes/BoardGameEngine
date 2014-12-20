module AgileObjects.StrategyGame.Game.Status {

    export class PieceMoveAction implements IGameAction {
        constructor(movement: Pieces.PieceMovement) {
            this.description =
            movement.origin.coordinates.signature + " moved to " +
            movement.destination.coordinates.signature;
        }

        public description: string;
    }
}