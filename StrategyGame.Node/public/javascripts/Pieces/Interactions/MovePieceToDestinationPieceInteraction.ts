module AgileObjects.StrategyGame.Game.Pieces {

    export class MovePieceToDestinationPieceInteraction implements IPieceInteraction {
        constructor(public path: Array<IPieceLocation>) {
            this.location = this.path[this.path.length - 1];
        }

        public type = InteractionType.Move;
        public location: IPieceLocation;

        public complete(): void {
            this.path[0].movePieceThrough([this.location.piece]);
        }
    }
}