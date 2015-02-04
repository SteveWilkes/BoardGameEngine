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
                "@oe$*+" +
                "_" + // PieceDefinition 2
                "2`Human Soldier`Soldier.png`" +
                "0~m2~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@iu" +
                "^" +
                "0~m1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@oe$1+" +
                "^" +
                "1~a1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@oe$+*" +
                "_" + // PieceDefinition 3
                "3`Human Ninja`Ninja.png`" +
                "0~m2~" +
                "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                "@iu" +
                "@iu" +
                "^" +
                "0~m1~" +
                "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                "@iu" +
                "@oe$1+" +
                "^" +
                "1~a1~" +
                "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                "@iu" +
                "@oe$+*" +
                "/" +
            // PieceConfigData
                "1^1^5`2^2^4`2^2^5`2^2^6`3^3^3`3^3^4`3^3^5`3^3^6`3^3^7";
        }
    }
}