module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceFactory {
        createPiece(pieceDefinitionId: string): Piece;
    }

    export var pieceFactory = "$pieceFactory";

    var oneSpaceInAnyDirectionCalculators = [
        [new TypeScript.CoordinateTranslator("up", 1)],
        [new TypeScript.CoordinateTranslator("upRight", 1)],
        [new TypeScript.CoordinateTranslator("right", 1)],
        [new TypeScript.CoordinateTranslator("downRight", 1)],
        [new TypeScript.CoordinateTranslator("down", 1)],
        [new TypeScript.CoordinateTranslator("downLeft", 1)],
        [new TypeScript.CoordinateTranslator("left", 1)],
        [new TypeScript.CoordinateTranslator("upLeft", 1)]
    ];

    var anyOccupiedDirectionMovementProfile = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new OnlyOccupiedLocationsValidator()]);

    var anyDroppableDirectionMovementProfile = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new OnlyDroppableLocationsValidator()]);

    var nullAttackProfile = new PieceAttackProfile([]);

    var examplePieceAttackProfile = new PieceAttackProfile(
        [new PieceAttack(anyOccupiedDirectionMovementProfile, 10)]);

    class PieceFactory implements IPieceFactory {
        private _definitions: TypeScript.IStringDictionary<PieceDefinition>;
        private _nextPieceId: number;

        constructor() {
            this._definitions = {
                "1": new PieceDefinition(
                    "1",
                    "Bomb",
                    "/images/pieces/Bomb.png",
                    anyOccupiedDirectionMovementProfile,
                    () => new AttachTargetPieceToDroppedPieceDropHandler(["2"]),
                    nullAttackProfile),
                "2": new PieceDefinition(
                    "2",
                    "Example",
                    "/images/pieces/Example.png",
                    anyDroppableDirectionMovementProfile,
                    () => new AttachDroppedPieceToTargetPieceDropHandler(["1"]),
                    examplePieceAttackProfile)
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("piece-" + pieceId);
        }
    }

    angular
        .module(strategyGameApp)
        .service(pieceFactory, PieceFactory);
}