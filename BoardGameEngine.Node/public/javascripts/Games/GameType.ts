module AgileObjects.BoardGameEngine.Games {

    export class GameType implements TypeScript.IEntity<string>, Teams.ITeamConfigData {
        constructor(
            public id: string,
            public boardType: Boards.BoardType,
            public turnInteractions: Array<Pieces.InteractionType>,
            public pieceDefinitions: TypeScript.IStringDictionary<Pieces.PieceDefinition>,
            public pieceConfigData: Array<Pieces.PieceConfigData>) {
        }
    }
}