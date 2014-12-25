module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceFactory {
        createPiece(teamNumber: number, pieceDefinitionId: string, events: EventSet): Piece;
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

    var bombLocationTranslator = (boardTile: IPieceLocation) => [boardTile.piece];

    var examplePieceDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new CompositeAnyPieceLocationValidator([new IsUnoccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])])]);

    var examplePieceLocationTranslator = (boardTile: IPieceLocation) => {
        var locations = [boardTile];
        if (boardTile.isOccupied() && (boardTile.piece.definitionId === "1")) {
            locations.push(boardTile.piece);
        }
        return locations;
    };

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
                    "/images/pieces/Bomb",
                    new PieceMovementProfile([bombDestinationsCalculator], bombLocationTranslator),
                    () => new AttachTargetPieceToDroppedPieceDropHandler(),
                    nullAttackProfile),
                "2": new PieceDefinition(
                    "2",
                    "Example",
                    "/images/pieces/HumanHeavy",
                    new PieceMovementProfile([examplePieceDestinationsCalculator], examplePieceLocationTranslator),
                    () => new AttachDroppedPieceToTargetPieceDropHandler(),
                    new PieceAttackProfile([examplePieceAttack]))
            };
            this._nextPieceId = 1;
        }

        public createPiece(teamNumber: number, definitionId: string, events: EventSet): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece(teamNumber, "p-" + pieceId, events);
        }
    }

    angular
        .module(strategyGameApp)
        .service(pieceFactory, PieceFactory);
}