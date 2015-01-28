module AgileObjects.BoardGameEngine.Pieces {

    export class AttackDestinationPieceInteraction extends PieceInteractionBase {
        constructor(
            id: string,
            piece: Piece,
            path: Array<IPieceLocation>,
            private _events: Games.GameEventSet) {

            super(id, piece, path, InteractionType.Attack);
        }

        public complete(): void {
            var attacker = this.piece;
            var target = this.location.piece;
            var damage = target.applyAttackBy(attacker);

            var attack = new PieceAttack(this.id, attacker, target, damage);

            this._events.pieceAttacked.publish(attack);

            if (target.hasBeenTaken()) {
                this._events.pieceTaken.publish(target);
            }
        }
    }
}