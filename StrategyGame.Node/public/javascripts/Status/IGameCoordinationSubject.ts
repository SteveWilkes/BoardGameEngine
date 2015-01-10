module AgileObjects.StrategyGame.Game.Status {

    export interface IGameCoordinationSubject extends TypeScript.IEntity<string> {
        events: GameEventSet;
    }
}