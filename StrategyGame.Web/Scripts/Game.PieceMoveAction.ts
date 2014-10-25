module AgileObjects.StrategyGame.Game {

    export class PieceMoveAction implements IGameAction {
        constructor(private _origin: Coordinates, private _destination: Coordinates) {
        }
    }
}