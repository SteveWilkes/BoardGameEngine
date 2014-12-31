module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceFactory {
        createPiece(pieceDefinitionId: string, events: GameEventSet): Piece;
    }

    export var $pieceFactory = "$pieceFactory";

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

    // Bomb Attachment

    var bombAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["2"], [])]);

    var bombAttachmentCalculator = new PieceInteractionCalculator(
        InteractionType.Move,
        [bombAttachDestinationsCalculator],
        PieceInteractionConstructorRegistry.get("m3"));

    var bombInteractionProfile = new PieceInteractionProfile([bombAttachmentCalculator]);

    // Human Heavy Movement

    var humanHeavyMoveDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new IsUnoccupiedLocationValidator()]);

    var humanHeavyMovementCalculator = new PieceInteractionCalculator(
        InteractionType.Move,
        [humanHeavyMoveDestinationsCalculator],
        PieceInteractionConstructorRegistry.get("m2"));

    // Human Heavy Attachment

    var humanHeavyAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])]);

    var humanHeavyAttachmentCalculator = new PieceInteractionCalculator(
        InteractionType.Move,
        [humanHeavyAttachDestinationsCalculator],
        PieceInteractionConstructorRegistry.get("m1"));

    // Human Heavy Attack

    var humanHeavyAttackDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator([], ["*"])]);

    var humanHeavyAttackCalculator = new PieceInteractionCalculator(
        InteractionType.Attack,
        [humanHeavyAttackDestinationsCalculator],
        PieceInteractionConstructorRegistry.get("a1"));

    var humanHeavyInteractionProfile = new PieceInteractionProfile(
        [humanHeavyMovementCalculator, humanHeavyAttachmentCalculator, humanHeavyAttackCalculator]);

    class PieceFactory implements IPieceFactory {
        private _definitions: TypeScript.IStringDictionary<PieceDefinition>;
        private _nextPieceId: number;

        constructor() {
            this._definitions = {
                "1": new PieceDefinition(
                    "1",
                    "Bomb",
                    "/images/pieces/Bomb.png",
                    bombInteractionProfile),
                "2": new PieceDefinition(
                    "2",
                    "Example",
                    "/images/pieces/HumanHeavy.png",
                    humanHeavyInteractionProfile)
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string, events: GameEventSet): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("p-" + pieceId, events);
        }
    }

    angular
        .module(strategyGameApp)
        .service($pieceFactory, PieceFactory);
}