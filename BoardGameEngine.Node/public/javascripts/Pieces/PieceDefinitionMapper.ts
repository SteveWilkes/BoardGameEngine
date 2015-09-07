module AgileObjects.BoardGameEngine.Pieces {

    import Ts = TypeScript;

    var _coordinateTranslatorDirectionsByInitial = {
        ul: "upLeft", u: "up", ur: "upRight",
        l: "left", r: "right",
        dl: "downLeft", dr: "downRight", d: "down"
    };

    var _coordinateTranslatorsBySignature = {};

    var _pieceInteractionConstructorsById = {
        "m1": Pieces.AddDestinationPieceToPieceInteraction,
        "m2": Pieces.MovePieceToDestinationInteraction,
        "m3": Pieces.MovePieceToDestinationPieceInteraction,
        "a1": Pieces.AttackDestinationPieceInteraction,
    };

    var _attackDamageCalculatorConstructorsById = {
        "d1": Pieces.AttackDefenceDivisionDamageCalculatorOne
    };

    var _takenPieceProcessorConstructorsById = {
        "rp": Pieces.ReplacePieceWithAttachedPiece
    };

    var _noProcessors = new Array<ITakenPieceProcessor>(0);

    export class PieceDefinitionMapper {
        constructor(private _evaluatorMapper: Ts.Evaluation.EvaluatorMapper) { }

        public map(pieceDefinitionData: string): PieceDefinition {
            var pieceDefinitionDataItems = pieceDefinitionData.split("`");

            var id = pieceDefinitionDataItems[0];
            var name = pieceDefinitionDataItems[1];
            var image = "/images/pieces/" + pieceDefinitionDataItems[2];
            var vitalStats = pieceDefinitionDataItems[3].split("^");
            var interactionCalculators = this._mapInteractionCalculators(pieceDefinitionDataItems[4]);
            var takenPieceProcessors = this._mapTakenPieceProcessors(pieceDefinitionDataItems[5]);

            return new PieceDefinition(
                id,
                name,
                image,
                vitalStats,
                (pieceId: string, game: G.Game) => new PieceInteractionProfile(
                    interactionCalculators,
                    takenPieceProcessors,
                    pieceId,
                    game));
        }

        private _mapInteractionCalculators(interactionCalculatorData: string): Array<PieceInteractionCalculator> {
            var interactionCalculatorDataItems = interactionCalculatorData.split("^");
            var interactionCalculators = new Array<PieceInteractionCalculator>(interactionCalculatorDataItems.length);
            for (var i = 0; i < interactionCalculatorDataItems.length; i++) {
                interactionCalculators[i] = this._mapInteractionCalculator(interactionCalculatorDataItems[i]);
            }
            return interactionCalculators;
        }

        private _mapInteractionCalculator(interactionCalculatorData: string): PieceInteractionCalculator {
            var interactionCalculatorDataItems = interactionCalculatorData.split("~");

            var type = parseInt(interactionCalculatorDataItems[0]);
            var interactionTypeId = interactionCalculatorDataItems[1];

            return new PieceInteractionCalculator(
                type,
                this._mapRelatedLocationCalculators(interactionCalculatorDataItems[2]),
                _pieceInteractionConstructorsById[interactionTypeId],
                this._evaluatorMapper.map<Piece>(interactionCalculatorDataItems[3]));
        }

        private _mapRelatedLocationCalculators(locationCalculatorData: string): Array<RelatedLocationCalculator> {
            var locationCalculatorDataItems = locationCalculatorData.split("¬");
            var locationCalculators = new Array<RelatedLocationCalculator>(locationCalculatorDataItems.length);
            for (var i = 0; i < locationCalculatorDataItems.length; i++) {
                locationCalculators[i] = this._mapRelatedLocationCalculator(locationCalculatorDataItems[i]);
            }
            return locationCalculators;
        }

        private _mapRelatedLocationCalculator(locationCalculatorData: string): RelatedLocationCalculator {
            var locationCalculatorDataItems = locationCalculatorData.split("@");

            return new RelatedLocationCalculator(
                this._mapCoordinateTranslatorSets(locationCalculatorDataItems[0]),
                this._evaluatorMapper.map<PieceInteractionData>(locationCalculatorDataItems[1]),
                this._evaluatorMapper.map<PieceInteractionData>(locationCalculatorDataItems[2]));
        }

        private _mapCoordinateTranslatorSets(coordinateTranslatorSetData: string): Array<Array<Ts.CoordinateTranslator>> {
            var coordinateTranslatorSetDataItems = coordinateTranslatorSetData.split("#");
            var coordinateTranslatorSets = new Array<Array<Ts.CoordinateTranslator>>(coordinateTranslatorSetDataItems.length);
            for (var i = 0; i < coordinateTranslatorSetDataItems.length; i++) {
                coordinateTranslatorSets[i] = this._mapCoordinateTranslatorSet(coordinateTranslatorSetDataItems[i]);
            }
            return coordinateTranslatorSets;
        }

        private _mapCoordinateTranslatorSet(coordinateTranslatorSetData: string): Array<Ts.CoordinateTranslator> {
            var coordinateTranslatorDataItems = coordinateTranslatorSetData.split("&");
            var coordinateTranslatorSet = new Array<Ts.CoordinateTranslator>(coordinateTranslatorDataItems.length);
            for (var i = 0; i < coordinateTranslatorDataItems.length; i++) {
                coordinateTranslatorSet[i] = this._mapCoordinateTranslator(coordinateTranslatorDataItems[i]);
            }
            return coordinateTranslatorSet;
        }

        private _mapCoordinateTranslator(signature: string): Ts.CoordinateTranslator {
            if (!_coordinateTranslatorsBySignature.hasOwnProperty(signature)) {
                var coordinateTranslatorDataItems = signature.split("-");

                var translatorInitial = coordinateTranslatorDataItems[0];
                var distance = parseInt(coordinateTranslatorDataItems[1]);

                _coordinateTranslatorsBySignature[signature] = new Ts.CoordinateTranslator(
                    _coordinateTranslatorDirectionsByInitial[translatorInitial],
                    distance);
            }

            return _coordinateTranslatorsBySignature[signature];
        }

        private _mapTakenPieceProcessors(takenPieceProcessorsData: string): Array<ITakenPieceProcessor> {
            if ((takenPieceProcessorsData || "").length === 0) { return _noProcessors; }

            var takenPieceProcessorDataItems = takenPieceProcessorsData.split("^");
            var takenPieceProcessorSet = new Array<ITakenPieceProcessor>(takenPieceProcessorDataItems.length);
            for (var i = 0; i < takenPieceProcessorDataItems.length; i++) {
                var processorId = takenPieceProcessorDataItems[i]
                var processor = new _takenPieceProcessorConstructorsById[processorId]();
                takenPieceProcessorSet[i] = processor;
            }
            return takenPieceProcessorSet;
        }
    }
}