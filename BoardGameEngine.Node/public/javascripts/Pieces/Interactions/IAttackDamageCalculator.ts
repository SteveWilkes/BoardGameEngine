module AgileObjects.BoardGameEngine.Pieces {

    export interface IAttackDamageCalculator {
        calculate(victim: Piece, attacker: Piece): number;
    }
}