module AgileObjects.StrategyGame.Game {
    export interface IPiece {
        id: string;
        imageSource: string;
        width: number;
        height: number;
        resize(sizeSet: BoardSizeSet): void;
        movementProfile: IPieceMovementProfile;
    }
}