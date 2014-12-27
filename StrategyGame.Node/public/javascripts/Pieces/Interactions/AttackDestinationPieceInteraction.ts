module AgileObjects.StrategyGame.Game.Pieces {

    export class AttackDestinationPieceInteraction implements IPieceInteraction {
        constructor(private _startingLocation: IPieceLocation, public location: IPieceLocation) { }

        public type = InteractionType.Attack;

        public complete(): void {
            // TODO: _startingLocation.piece.attack(destination.piece);
        }
    }
}