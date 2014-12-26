module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceFactory {
        createPiece(pieceDefinitionId: string, events: EventSet): Piece;
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

    var humanHeavyDroppablePieceDefinitionIds = ["1"];

    var humanHeavyDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new CompositeAnyPieceLocationValidator([new IsUnoccupiedLocationValidator(), new IsDroppableLocationValidator(humanHeavyDroppablePieceDefinitionIds, [])])]);

    var humanHeavyLocationAdapter = (boardTile: IPieceLocation) => {
        var locations = [boardTile];
        if (boardTile.isOccupied() && (humanHeavyDroppablePieceDefinitionIds.indexOf(boardTile.piece.definitionId) !== -1)) {
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
                    "/images/pieces/Bomb.png",
                    new PieceMovementProfile([bombDestinationsCalculator], bombLocationTranslator),
                    () => new AttachTargetPieceToDroppedPieceDropHandler(),
                    nullAttackProfile),
                "2": new PieceDefinition(
                    "2",
                    "Example",
                    "/images/pieces/HumanHeavy.png",
                    new PieceMovementProfile([humanHeavyDestinationsCalculator], humanHeavyLocationAdapter),
                    () => new AttachDroppedPieceToTargetPieceDropHandler(),
                    new PieceAttackProfile([examplePieceAttack]))
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string, events: EventSet): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("p-" + pieceId, events);
        }
    }

    angular
        .module(strategyGameApp)
        .service(pieceFactory, PieceFactory);
}