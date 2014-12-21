module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceDropHandler {
        setTarget(targetPiece: Piece): void;
        canDrop(droppingPiece: Piece): boolean;
        handleDrop(droppedPiece: Piece): void;
    }

    export class PieceDropHandlerBase {
        protected targetPiece: Piece;

        constructor(private _droppablePieceDefinitionIds: Array<string>) { }

        public setTarget(targetPiece: Piece): void {
            this.targetPiece = targetPiece;
        }

        public canDrop(droppingPiece: Piece): boolean {
            return this._droppablePieceDefinitionIds.indexOf(droppingPiece.definitionId) > -1;
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