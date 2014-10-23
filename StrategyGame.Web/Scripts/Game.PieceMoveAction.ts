module AgileObjects.StrategyGame.Game {

    export class PieceMoveAction implements IGameAction {
        // ReSharper disable InconsistentNaming
        constructor(private _origin: Coordinates, private _destination: Coordinates) {
            // ReSharper restore InconsistentNaming
        }
    }
}