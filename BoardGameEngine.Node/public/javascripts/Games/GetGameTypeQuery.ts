module AgileObjects.BoardGameEngine.Games {

    export class GetGameTypeQuery implements TypeScript.IGetQuery<GameType> {
        constructor(private _gameTypeMapper: GameTypeMapper) { }

        public execute(gameTypeId: string): Games.GameType {
            var gameTypeData = this._getGameTypeData(gameTypeId);

            return this._gameTypeMapper.map(gameTypeData);
        }

        private _getGameTypeData(gameTypeId: string): string {
            // TODO: Retrieve GameType data from a data store and cache:
            return "run-the-bomb/1/2/" + // GameTypeId / BoardTypeId / Max. number of teams
            // Annotations
                "bt^1x5^btt^bombTileTeam^t" +
                "/" +
            // Turn Interaction Ids
                "1_0`p=D:g.st.h.pa.p|!p.t=D:g.st.h.pa.p.t" +
                "/" +
            // PieceDefinitions
                "1`Bomb`Bomb.png`" + // PieceDefinition 1 - Bomb
                "0~m3~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@l.p.d=2,3+l.p.t=D:p.t" +
                "_" + // PieceDefinition 2 - Soldier
                "2`Human Soldier`Soldier.png`" +
                "0~m2~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@!l.io" +
                "^" +
                "0~m1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@l.p.d=1+l.p.t=D:p.t" +
                "^" +
                "1~a1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" + // 1-space attack
                "@" +
                "@l.io+!l.p.t=D:p.t" +
                "~" +
                "!io" + // ...if unoccupied
                "`rp" + // Leave the Bomb on the board when a Solder is taken
                "_" + // PieceDefinition 3 - Ninja
                "3`Human Ninja`Ninja.png`" +
                "0~m2~" +
                "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" + // 2-space movement 
                "@!l.io" +
                "@!l.io" +
                "~" +
                "!io" + // ...if unoccupied
                "^" +
                "0~m2~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" + // 1-space movement
                "@" +
                "@!l.io" +
                "~" +
                "io" + // ...if occupied
                "^" +
                "0~m1~" +
                "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                "@" +
                "@l.p.d=1+l.p.t=D:p.t" +
                "^" +
                "1~a1~" +
                "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" + // 2-space attack
                "@!l.io" +
                "@l.io+!l.p.t=D:p.t" +
                "~" +
                "!io" + // ...if unoccupied
                "`rp" + // Leave the Bomb on the board when a Ninja is taken
                "/" +
            // PieceConfigData
                "1^1^5`2^2^4`2^2^5`2^2^6`3^3^3`3^3^4`3^3^5`3^3^6`3^3^7" +
                "/" +
            // Event Mappings
                "pmd`p.l.btt+p.p.d=1+!p.t=D:p.l.btt`td`p.l.btt";
        }
    }
}