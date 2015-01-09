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

    var bombInteractionProfileFactory = (events: GameEventSet) => new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [bombAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.get("m3"),
            events)]);

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

    var humanHeavyInteractionProfileFactory = (events: GameEventSet) => new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanHeavyMoveDestinationsCalculator],
            PieceInteractionConstructorRegistry.get("m2"),
            events),
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanHeavyAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.get("m1"),
            events),
        new PieceInteractionCalculator(
            InteractionType.Attack,
            [humanHeavyAttackDestinationsCalculator],
            PieceInteractionConstructorRegistry.get("a1"),
            events)]);

    // Human Light Movement

    var humanLightMoveDestinationsCalculator = new RelatedLocationCalculator(
        twoSpacesInAnyDirectionCalculators,
        [],
        [new IsUnoccupiedLocationValidator()]);

    // Human Light Attachment

    var humanLightAttachDestinationsCalculator = new RelatedLocationCalculator(
        oneSpaceInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator(["1"], [])]);

    // Human Light Attack

    var humanLightAttackDestinationsCalculator = new RelatedLocationCalculator(
        twoSpacesInAnyDirectionCalculators,
        [],
        [new IsOccupiedLocationValidator(), new IsDroppableLocationValidator([], ["*"])]);

    var humanLightInteractionProfileFactory = (events: GameEventSet) => new PieceInteractionProfile([
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanLightMoveDestinationsCalculator],
            PieceInteractionConstructorRegistry.get("m2"),
            events),
        new PieceInteractionCalculator(
            InteractionType.Move,
            [humanLightAttachDestinationsCalculator],
            PieceInteractionConstructorRegistry.get("m1"),
            events),
        new PieceInteractionCalculator(
            InteractionType.Attack,
            [humanLightAttackDestinationsCalculator],
            PieceInteractionConstructorRegistry.get("a1"),
            events)]);

    class PieceFactory implements IPieceFactory {
        private _definitions: TypeScript.IStringDictionary<PieceDefinition>;
        private _nextPieceId: number;

        constructor() {
            this._definitions = {
                "1": new PieceDefinition(
                    "1",
                    "Bomb",
                    "/images/pieces/Bomb.png",
                    bombInteractionProfileFactory),
                "2": new PieceDefinition(
                    "2",
                    "Human Heavy",
                    "/images/pieces/HumanHeavy.png",
                    humanHeavyInteractionProfileFactory),
                "3": new PieceDefinition(
                    "3",
                    "Example",
                    "/images/pieces/Example.png",
                    humanLightInteractionProfileFactory)
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