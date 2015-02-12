module AgileObjects.BoardGameEngine.Pieces {

    export class PieceDataSet {
        constructor(
            public definitions: TypeScript.IStringDictionary<Pieces.PieceDefinition>,
            public configData: Array<Pieces.PieceConfigData>) { }
    }
}