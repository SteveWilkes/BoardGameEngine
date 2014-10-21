module AgileObjects.StrategyGame.Game {

    export var defaultPieceWidth = 50;
    export var defaultPieceHeight = 80;

    export interface IPiece {
        id: string;
        imageSource: string;
        width: number;
        height: number;
        resize(resizeFactor: number): void;
    }
}