module AgileObjects.BoardGameEngine.Boards {

    export class TeamAdditionData {
        constructor(
            public team: Teams.Team,
            public position: BoardPosition,
            public allTiles: Pieces.IPieceLocationDictionary) { }
    }
}