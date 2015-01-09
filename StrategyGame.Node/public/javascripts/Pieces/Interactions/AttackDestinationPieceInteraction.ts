module AgileObjects.StrategyGame.Game.Pieces {

    export class AttackDestinationPieceInteraction implements IPieceInteraction {
        constructor(public path: Array<IPieceLocation>) {
            this.location = this.path[this.path.length - 1];
        }

        public type = InteractionType.Attack;
        public location: IPieceLocation;

        public complete(): void {
            this.location.piece.applyAttackBy(this.path[0].piece);
        }

        static isValid = (path: Array<IPieceLocation>) => { return true; }
    }
}