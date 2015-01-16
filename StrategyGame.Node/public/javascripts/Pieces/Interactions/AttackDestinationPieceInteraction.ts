module AgileObjects.StrategyGame.Game.Pieces {

    export class AttackDestinationPieceInteraction implements IPieceInteraction {
        constructor(public path: Array<IPieceLocation>, private _events: GameEventSet) {
            this.location = this.path[this.path.length - 1];
        }

        public type = InteractionType.Attack;
        public location: IPieceLocation;

        public complete(): void {
            var attacker = this.path[0].piece;
            var target = this.location.piece;
            var damage = target.applyAttackBy(attacker);

            var attack = new PieceAttack(attacker, target, damage);

            this._events.pieceAttacked.publish(attack);

            if (target.hasBeenTaken()) {
                this._events.pieceTaken.publish(target);
            }
        }
    }
}