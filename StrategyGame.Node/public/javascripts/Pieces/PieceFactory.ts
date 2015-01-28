module AgileObjects.BoardGameEngine.Pieces {

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

    // Human Soldier Movement

    var humanSoldierMoveDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsUnoccupiedLocationValidator()]);

    // Human Soldier Attachment

    var humanSoldierAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])]);

    // Human Soldier Attack

    var humanSoldierAttackDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator([], ["*"])]);

    var humanSoldierInteractionProfile = new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanSoldierMoveDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m2")),
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanSoldierAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m1")),
        new PieceInteractionCalculator(
            InteractionType.Attack,
            [humanSoldierAttackDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("a1"))]);

    // Human Ninja Movement

    var humanNinjaMoveDestinationsCalculator = new RelatedLocationCalculator(
        twoSpacesInAnyDirectionCalculators,
        [new IsUnoccupiedLocationValidator()],
        [new IsUnoccupiedLocationValidator()]);

    // Human Ninja Attachment

    var humanNinjaAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])]);

    // Human Ninja Attack

    var humanNinjaAttackDestinationsCalculator = new RelatedLocationCalculator(
        twoSpacesInAnyDirectionCalculators,
        [new IsUnoccupiedLocationValidator()],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator([], ["*"])]);

    var humanNinjaInteractionProfile = new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanNinjaMoveDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m2")),
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanNinjaAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.INSTANCE.get("m1")),
        new PieceInteractionCalculator(
            InteractionType.Attack,
            [humanNinjaAttackDestinationsCalculator],
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
                    "Human Soldier",
                    "/images/pieces/Soldier.png",
                    humanSoldierInteractionProfile),
                "3": new PieceDefinition(
                    "3",
                    "Example",
                    "/images/pieces/Ninja.png",
                    humanNinjaInteractionProfile)
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("p-" + pieceId);
        }
    }
}