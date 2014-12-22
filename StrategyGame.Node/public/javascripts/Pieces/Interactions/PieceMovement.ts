module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovement extends TypeScript.EventCallbackSetBase {
        constructor(public origin: IPieceLocation, public destination: IPieceLocation) {
            super();
        }
    }
}
