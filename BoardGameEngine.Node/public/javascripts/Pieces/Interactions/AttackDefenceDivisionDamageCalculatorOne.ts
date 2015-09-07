module AgileObjects.BoardGameEngine.Pieces {

    export class AttackDefenceDivisionDamageCalculatorOne implements IAttackDamageCalculator {

        public calculate(victim: Piece, attacker: Piece): number {
            var defenceFactor = victim.defence * 2;
            var attackFactor = attacker.attack;
            var damage = attackFactor / defenceFactor;

            return damage;
        }
    }
}