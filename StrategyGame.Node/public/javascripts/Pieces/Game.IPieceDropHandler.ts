module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceDropHandler {
        setTarget(targetPiece: IPiece): void;
        canDrop(droppingPiece: IPiece): boolean;
        handleDrop(droppedPiece: IPiece): void;
    }

    export class PieceDropHandlerBase {
        protected targetPiece: IPiece;

        constructor(private _droppablePieceDefinitionIds: Array<string>) { }

        public setTarget(targetPiece: IPiece): void {
            this.targetPiece = targetPiece;
        }

        public canDrop(droppingPiece: IPiece): boolean {
            return this._droppablePieceDefinitionIds.indexOf(droppingPiece.definitionId) > -1;
        }
    }

    export class AttachDroppedPieceToTargetPieceDropHandler
        extends PieceDropHandlerBase
        implements IPieceDropHandler {

        public handleDrop(droppedPiece: IPiece): void {
            this.targetPiece.attachedPiece = droppedPiece;
        }
    }

    export class AttachTargetPieceToDroppedPieceDropHandler
        extends PieceDropHandlerBase
        implements IPieceDropHandler {

        public handleDrop(droppedPiece: IPiece): void {
            droppedPiece.attachedPiece = this.targetPiece;
            this.targetPiece.location.replacePieceWith(droppedPiece);
        }
    }
}