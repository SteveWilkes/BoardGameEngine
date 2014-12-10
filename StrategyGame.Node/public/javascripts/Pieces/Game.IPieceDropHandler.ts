module AgileObjects.StrategyGame.Game {
    export interface IPieceDropHandler {
        handleDrop(targetPiece: IPiece, droppedPiece: IPiece): void;
    }

    export class AttachDroppedPieceToTargetPieceDropHandler implements IPieceDropHandler {
        public handleDrop(targetPiece: IPiece, droppedPiece: IPiece): void {
            targetPiece.attachedPiece = droppedPiece;
        }
    }

    export class AttachTargetPieceToDroppedPieceDropHandler implements IPieceDropHandler {
        public handleDrop(targetPiece: IPiece, droppedPiece: IPiece): void {
            droppedPiece.attachedPiece = targetPiece;
        }
    }
}