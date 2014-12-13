module AgileObjects.StrategyGame.Game {

    export interface IPieceFactory {
        createPiece(pieceDefinitionId: string): IPiece;
    }

    export var pieceFactory = "$pieceFactory";

    class PieceFactory implements IPieceFactory {
        private _definitions: TypeScript.IStringDictionary<PieceDefinition>;
        private _nextPieceId: number;

        constructor() {
            this._definitions = {
                "1": new PieceDefinition(
                    "1",
                    "Bomb",
                    "/images/pieces/Bomb.png",
                    new AnyDirectionMovementProfile(1, [new OnlyOccupiedLocationsPieceDestinationFilter()]),
                    () => new AttachTargetPieceToDroppedPieceDropHandler(["2"])),
                "2": new PieceDefinition(
                    "2",
                    "Example",
                    "/images/pieces/Example.png",
                    new AnyDirectionMovementProfile(1, [new OnlyDroppableLocationsPieceDestinationFilter()]),
                    () => new AttachDroppedPieceToTargetPieceDropHandler(["1"]))
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string): IPiece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("piece-" + pieceId);
        }
    }

    angular
        .module(strategyGameApp)
        .service(pieceFactory, PieceFactory);
}