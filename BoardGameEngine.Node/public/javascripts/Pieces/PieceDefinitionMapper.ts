module AgileObjects.BoardGameEngine.Pieces {

    import Ts = TypeScript;

    var _coordinateTranslatorDirectionsByInitial = {
        ul: "upLeft", u: "up", ur: "upRight",
        l: "left", r: "right",
        dl: "downLeft", dr: "downRight", d: "down"
    };

    var _coordinateTranslatorsBySignature = {};

    var _pieceInteractionConstructorsById = {
        "m1": AddDestinationPieceToPieceInteraction,
        "m2": MovePieceToDestinationInteraction,
        "m3": MovePieceToDestinationPieceInteraction,
        "a1": AttackDestinationPieceInteraction
    };

    var evaluatorMapper = new Evaluation.PieceEvaluatorMapper();

    export class PieceDefinitionMapper {
        static INSTANCE = new PieceDefinitionMapper();

        public map(pieceDefinitionData: string): PieceDefinition {
            var pieceDefinitionDataItems = pieceDefinitionData.split("`");

            var id = pieceDefinitionDataItems[0];
            var name = pieceDefinitionDataItems[1];
            var image = "/images/pieces/" + pieceDefinitionDataItems[2];

            return new PieceDefinition(
                id,
                name,
                image,
                new PieceInteractionProfile(this._mapInteractionCalculators(pieceDefinitionDataItems[3])));
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
                this._mapEvaluator<Piece>(interactionCalculatorDataItems[3]));
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
                this._mapEvaluator<PieceInteractionData>(locationCalculatorDataItems[1]),
                this._mapEvaluator<PieceInteractionData>(locationCalculatorDataItems[2]));
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

        private _mapEvaluator<T>(evaluatorData: string): Ts.Evaluation.IEvaluator<T> {
            if ((evaluatorData || "").length === 0) {
                return Ts.Evaluation.AlwaysTrueEvaluator.INSTANCE;
            }

            var evaluatorPattern = evaluatorMapper.map(evaluatorData);

            return Ts.Evaluation.EvaluatorParser.INSTANCE.parse(evaluatorPattern);
        }
    }
}