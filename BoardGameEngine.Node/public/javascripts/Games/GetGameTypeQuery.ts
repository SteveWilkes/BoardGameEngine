module AgileObjects.BoardGameEngine.Games {

    export class GetGameTypeQuery implements TypeScript.IGetQuery<GameType> {
        constructor(private _gameTypeMapper: GameTypeMapper) { }

        public execute(gameTypeId: string): Games.GameType {
            var gameTypeData = this._getGameTypeData(gameTypeId);

            return this._gameTypeMapper.map(gameTypeData);
        }

        private _getGameTypeData(gameTypeId: string): string {
            // TODO: Retrieve GameType data from a data store and cache:
            return "1/1/" + // GameTypeId / BoardTypeId
            // Turn Interaction Ids
                "1^0" +
                "/" +
            // PieceDefinitions
                "1`Bomb`Bomb.png`" + // PieceDefinition 1
                "0~m3~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@l.p.d=2,3+l.p.t.id=F:p.t.id" +
                "_" + // PieceDefinition 2
                "2`Human Soldier`Soldier.png`" +
                "0~m2~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@!l.io" +
                "^" +
                "0~m1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@l.p.d=1+l.p.t.id=F:p.t.id" +
                "^" +
                "1~a1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@l.io+!l.p.t.id=F:p.t.id" +
                "_" + // PieceDefinition 3
                "3`Human Ninja`Ninja.png`" +
                "0~m2~" +
                "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                "@!l.io" +
                "@!l.io" +
                "~" +
                "!io" + // 2-space movement if unoccupied
                "^" +
                "0~m2~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@!l.io" +
                "~" +
                "io" + // 1-space movement if occupied
                "^" +
                "0~m1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@l.p.d=1+l.p.t.id=F:p.t.id" +
                "^" +
                "1~a1~" +
                "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                "@!l.io" +
                "@l.io+!l.p.t.id=F:p.t.id" +
                "/" +
            // PieceConfigData
                "1^1^5`2^2^4`2^2^5`2^2^6`3^3^3`3^3^4`3^3^5`3^3^6`3^3^7" +
                "/" +
                "";
        }
    }
}