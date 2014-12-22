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

    var bombDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new CompositeAllPieceLocationValidator([new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["2"], [])])]);

    var examplePieceDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new CompositeAnyPieceLocationValidator([new IsUnoccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])])]);

    var nullAttackProfile = new PieceAttackProfile([]);

    var examplePieceAttack = new PieceAttack(
        new RelatedLocationCalculator(
            oneSpaceInAnyDirectionCalculators,
            [new CompositeAllPieceLocationValidator([new IsOccupiedLocationValidator(), new IsDroppableLocationValidator([], ["2"])])]),
        10);

    class PieceFactory implements IPieceFactory {
        private _definitions: TypeScript.IStringDictionary<PieceDefinition>;
        private _nextPieceId: number;

        constructor() {
            this._definitions = {
                "1": new PieceDefinition(
                    "1",
                    "Bomb",
                    "/images/pieces/Bomb.png",
                    new PieceMovementProfile([bombDestinationsCalculator]),
                    () => new AttachTargetPieceToDroppedPieceDropHandler(),
                    nullAttackProfile),
                "2": new PieceDefinition(
                    "2",
                    "Example",
                    "/images/pieces/Example.png",
                    new PieceMovementProfile([examplePieceDestinationsCalculator]),
                    () => new AttachDroppedPieceToTargetPieceDropHandler(),
                    new PieceAttackProfile([examplePieceAttack]))
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