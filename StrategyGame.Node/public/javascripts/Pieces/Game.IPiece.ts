module AgileObjects.StrategyGame.Game {
    export interface IPiece {
        id: string;
        definitionId: string;
        imageSource: string;
        location: IPieceLocation;
        attachedPiece: IPiece;
        movementProfile: IPieceMovementProfile;
        pieceDropHandler: IPieceDropHandler;
    }
}