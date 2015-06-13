module AgileObjects.BoardGameEngine.Games {

    export class GetGameDataQuery implements Ts.IGetQuery<GameData> {

        constructor() { }

        public execute(entityId: string): GameData {
            return null;
        }
    }
}