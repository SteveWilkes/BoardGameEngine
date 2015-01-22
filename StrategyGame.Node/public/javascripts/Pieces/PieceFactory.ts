module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceFactory {
        createPiece(pieceDefinitionId: string): Piece;
    }

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

    var twoSpacesInAnyDirectionCalculators = [
        [new TypeScript.CoordinateTranslator("up", 2)],
        [new TypeScript.CoordinateTranslator("upRight", 2)],
        [new TypeScript.CoordinateTranslator("right", 2)],
        [new TypeScript.CoordinateTranslator("downRight", 2)],
        [new TypeScript.CoordinateTranslator("down", 2)],
        [new TypeScript.CoordinateTranslator("downLeft", 2)],
        [new TypeScript.CoordinateTranslator("left", 2)],
        [new TypeScript.CoordinateTranslator("upLeft", 2)]
    ];

    // Bomb Attachment

    var bombAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["*"], [])]);

    var bombInteractionProfile = new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [bombAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m3"))]);

    // Human Heavy Movement

    var humanHeavyMoveDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsUnoccupiedLocationValidator()]);

    // Human Heavy Attachment

    var humanHeavyAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])]);

    // Human Heavy Attack

    var humanHeavyAttackDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator([], ["*"])]);

    var humanHeavyInteractionProfile = new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanHeavyMoveDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m2")),
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanHeavyAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m1")),
        new PieceInteractionCalculator(
            InteractionType.Attack,
            [humanHeavyAttackDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("a1"))]);

    // Human Light Movement

    var humanLightMoveDestinationsCalculator = new RelatedLocationCalculator(
        twoSpacesInAnyDirectionCalculators,
        [new IsUnoccupiedLocationValidator()],
        [new IsUnoccupiedLocationValidator()]);

    // Human Light Attachment

    var humanLightAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])]);

    // Human Light Attack

    var humanLightAttackDestinationsCalculator = new RelatedLocationCalculator(
        twoSpacesInAnyDirectionCalculators,
        [new IsUnoccupiedLocationValidator()],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator([], ["*"])]);

    var humanLightInteractionProfile = new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanLightMoveDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m2")),
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanLightAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m1")),
        new PieceInteractionCalculator(
            InteractionType.Attack,
            [humanLightAttackDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("a1"))]);

    export class PieceFactory implements IPieceFactory {
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
                    "Human Heavy",
                    "/images/pieces/HumanHeavy.png",
                    humanHeavyInteractionProfile),
                "3": new PieceDefinition(
                    "3",
                    "Example",
                    "/images/pieces/Example.png",
                    humanLightInteractionProfile)
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("p-" + pieceId);
        }
    }
}