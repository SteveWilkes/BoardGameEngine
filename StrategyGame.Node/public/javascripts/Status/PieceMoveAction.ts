module AgileObjects.StrategyGame.Game.Status {

    export class PieceMoveAction implements IGameAction {
        constructor(private _movement: Pieces.PieceMovement) {
        }
    }
}