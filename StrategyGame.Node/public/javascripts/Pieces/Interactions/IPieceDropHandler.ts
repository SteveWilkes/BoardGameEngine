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

    /** Handles a Piece being attached to another Piece onto which it is dropped. */
    export class AttachDroppedPieceToTargetPieceDropHandler
        extends PieceDropHandlerBase
        implements IPieceDropHandler {

        public handleDrop(droppedPiece: Piece): void {
            this.targetPiece.add(droppedPiece);
        }
    }

    /** Handles a Piece being attached to another Piece which is dropped onto it. */
    export class AttachTargetPieceToDroppedPieceDropHandler
        extends PieceDropHandlerBase
        implements IPieceDropHandler {

        public handleDrop(droppedPiece: Piece): void {
            droppedPiece.setLocation(this.targetPiece.location);
            droppedPiece.add(this.targetPiece);
        }
    }
}