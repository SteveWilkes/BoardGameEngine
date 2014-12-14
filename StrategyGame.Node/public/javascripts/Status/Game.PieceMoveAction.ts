module AgileObjects.StrategyGame.Game.Status {

    export class PieceMoveAction implements IGameAction {
        constructor(private _origin: Coordinates, private _destination: Coordinates) {
        }
    }
}