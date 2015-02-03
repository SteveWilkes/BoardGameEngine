module AgileObjects.BoardGameEngine.Pieces {

    export class PieceFactory {
        private _definitions: TypeScript.IStringDictionary<PieceDefinition>;
        private _nextPieceId: number;

        constructor() {

            this._definitions = {
                "1": PieceDefinitionMapper.INSTANCE.map(
                    "1`Bomb`Bomb.png`" +
                    "0~m3~" +
                    "u-1#ur-1#r-1#dr-1#d-1#dl-1#l-1#ul-1" +
                    "@" +
                    "@oe$*+"),
                "2": PieceDefinitionMapper.INSTANCE.map(
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
                    "@oe$+*"),
                "3": PieceDefinitionMapper.INSTANCE.map(
                    "3`Human Ninja`Ninja.png`" +
                    "0~m2~" +
                    "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                    "@iu" +
                    "@iu" +
                    "^" +
                    "0~m1~" +
                    "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                    "@" +
                    "@oe$1+" +
                    "^" +
                    "1~a1~" +
                    "u-2#ur-2#r-2#dr-2#d-2#dl-2#l-2#ul-2" +
                    "@iu" +
                    "@oe$+*")
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string, teamNumber: number): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("p-" + pieceId, teamNumber);
        }
    }
}