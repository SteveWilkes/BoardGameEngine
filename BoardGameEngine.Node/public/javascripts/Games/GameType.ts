﻿module AgileObjects.BoardGameEngine.Games {

    export class GameType implements Ts.IEntity<string> {
        constructor(
            public id: string,
            public boardType: B.BoardType,
            public maximumNumberOfTeams: number,
            public turnDefinition: I.TurnDefinition,
            public pieceData: P.PieceDataSet,
            public annotations: Array<Ts.Annotations.IEntityAnnotation>,
            public eventMappings: Array<Ts.EventMapping>) {
        }
    }
}