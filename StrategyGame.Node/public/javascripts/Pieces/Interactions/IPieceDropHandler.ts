module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceDropHandler {
        setTarget(targetPiece: Piece): void;
        handleDrop(droppedPiece: Piece): void;
    }

    export class PieceDropHandlerBase {
        protected targetPiece: Piece;

        public setTarget(targetPiece: Piece): void {
            this.targetPiece = targetPiece;
        }
    }

    export class AttachDroppedPieceToTargetPieceDropHandler
        extends PieceDropHandlerBase
        implements IPieceDropHandler {

        public handleDrop(droppedPiece: Piece): void {
            this.targetPiece.attachedPiece = droppedPiece;
            droppedPiece.location = this.targetPiece.location;
        }
    }

    export class AttachTargetPieceToDroppedPieceDropHandler
        extends PieceDropHandlerBase
        implements IPieceDropHandler {

        public handleDrop(droppedPiece: Piece): void {
            droppedPiece.attachedPiece = this.targetPiece;
            this.targetPiece.location.replacePieceWith(droppedPiece);
        }
    }
}