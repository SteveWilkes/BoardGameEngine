module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceAttack {
        constructor(public attacker: Piece, public target: Piece, public damage: number) { }
    }
}
