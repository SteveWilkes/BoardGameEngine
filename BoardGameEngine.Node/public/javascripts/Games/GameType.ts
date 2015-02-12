module AgileObjects.BoardGameEngine.Games {

    export class GameType implements TypeScript.IEntity<string> {
        constructor(
            public id: string,
            public boardType: Boards.BoardType,
            public turnInteractions: Array<Pieces.InteractionType>,
            public pieceData: Pieces.PieceDataSet) {
        }
    }
}