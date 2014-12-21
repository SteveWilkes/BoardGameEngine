module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceFactory {
        createPiece(pieceDefinitionId: string): IPiece;
    }

    export var pieceFactory = "$pieceFactory";

    var anyDirectionOneSpaceDestinationFactories = [
        [new PotentialMovementSegment("up", 1)],
        [new PotentialMovementSegment("upRight", 1)],
        [new PotentialMovementSegment("right", 1)],
        [new PotentialMovementSegment("downRight", 1)],
        [new PotentialMovementSegment("down", 1)],
        [new PotentialMovementSegment("downLeft", 1)],
        [new PotentialMovementSegment("left", 1)],
        [new PotentialMovementSegment("upLeft", 1)]
    ];

    var anyOccupiedDirectionMovementProfile = new PieceMovementProfile(
        anyDirectionOneSpaceDestinationFactories,
        [new OnlyOccupiedLocationsPieceDestinationFilter()]);

    var anyDroppableDirectionMovementProfile = new PieceMovementProfile(
        anyDirectionOneSpaceDestinationFactories,
        [new OnlyDroppableLocationsPieceDestinationFilter()]);

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
                    () => new AttachTargetPieceToDroppedPieceDropHandler(["2"])),
                "2": new PieceDefinition(
                    "2",
                    "Example",
                    "/images/pieces/Example.png",
                    anyDroppableDirectionMovementProfile,
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