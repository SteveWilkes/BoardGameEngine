module AgileObjects.BoardGameEngine.Games {

    export class GameType implements Ts.IEntity<string> {
        constructor(
            public id: string,
            public boardType: Boards.BoardType,
            public turnInteractions: Array<Pieces.InteractionType>,
            public pieceData: Pieces.PieceDataSet,
            public annotations: Array<Ts.Annotations.IEntityAnnotation>) { }
    }
}