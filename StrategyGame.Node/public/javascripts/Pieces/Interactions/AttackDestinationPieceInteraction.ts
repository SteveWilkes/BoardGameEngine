module AgileObjects.StrategyGame.Pieces {

    export class AttackDestinationPieceInteraction extends PieceInteractionBase {
        constructor(public path: Array<IPieceLocation>, private _events: Games.GameEventSet) {
            super(path, InteractionType.Attack);
        }

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