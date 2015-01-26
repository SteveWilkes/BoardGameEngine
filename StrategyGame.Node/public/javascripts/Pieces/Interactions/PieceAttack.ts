module AgileObjects.StrategyGame.Pieces {

    export class PieceAttack {
        constructor(
            public interactionId: string,
            public attacker: Piece,
            public target: Piece,
            public damage: number) { }
    }
}
