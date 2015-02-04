module AgileObjects.BoardGameEngine.Teams {

    export interface ITeamConfigData {
        pieceDefinitions: TypeScript.IStringDictionary<Pieces.PieceDefinition>;
        pieceConfigData: Array<Pieces.PieceConfigData>;
    }
}