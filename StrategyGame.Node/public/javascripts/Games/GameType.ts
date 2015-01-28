module AgileObjects.BoardGameEngine.Games {

    export class GameType implements TypeScript.IEntity<string> {
        constructor(
            public id: string,
            public boardType: Boards.BoardType,
            public interactionRegulator: Pieces.IPieceInteractionRegulator) {
        }
    }
}