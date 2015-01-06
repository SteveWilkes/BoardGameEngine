module AgileObjects.StrategyGame.Game.Pieces {

    export class AttackDestinationPieceInteraction implements IPieceInteraction {
        constructor(
            private _startingLocation: IPieceLocation,
            public location: IPieceLocation,
            private _events: GameEventSet) { }

        public type = InteractionType.Attack;

        public complete(): void {
            this.location.piece.applyAttackBy(this._startingLocation.piece);
        }
    }
}