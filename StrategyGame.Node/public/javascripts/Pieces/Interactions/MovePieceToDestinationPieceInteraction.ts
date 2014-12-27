module AgileObjects.StrategyGame.Game.Pieces {

    export class MovePieceToDestinationPieceInteraction implements IPieceInteraction {
        constructor(private _startingLocation: IPieceLocation, public location: IPieceLocation) { }

        public type = InteractionType.Move;

        public complete(): void {
            this._startingLocation.movePieceTo(this.location.piece);
        }
    }
}