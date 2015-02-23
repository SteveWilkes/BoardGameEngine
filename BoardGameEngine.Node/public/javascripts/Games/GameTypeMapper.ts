module AgileObjects.BoardGameEngine.Games {

    export class GameTypeMapper {
        constructor(
            private _getBoardTypeQuery: Ts.IGetQuery<Boards.BoardType>,
            private _annotationMapper: Ts.Annotations.IEntityAnnotationMapper,
            private _patternMapper: Ts.Evaluation.IEvaluatorPatternMapper) { }

        public map(gameTypeData: string): GameType {
            var gameTypeDataItems = gameTypeData.split("/");
            var gameTypeId = gameTypeDataItems[0];
            var boardTypeId = gameTypeDataItems[1];

            var annotations = this._mapEntityAnnotations(gameTypeDataItems[2]);
            var evaluatorPatternMapper = this._getEvaluatorPatternMapper(annotations);

            return new GameType(
                gameTypeId,
                this._getBoardTypeQuery.execute(boardTypeId),
                this._mapTurnInteractions(gameTypeDataItems[3]),
                new Pieces.PieceDataSet(
                    this._mapPieceDefinitions(gameTypeDataItems[4], evaluatorPatternMapper),
                    this._mapPieceConfigDataSet(gameTypeDataItems[5])),
                annotations,
                this._mapEventMappings(gameTypeDataItems[6], evaluatorPatternMapper));
        }

        private _mapEntityAnnotations(annotationData: string): Array<Ts.Annotations.IEntityAnnotation> {
            var annotationDataItems = annotationData.split("`");
            var annotations = new Array<Ts.Annotations.IEntityAnnotation>(annotationDataItems.length);
            for (var i = 0; i < annotationDataItems.length; i++) {
                annotations[i] = this._annotationMapper.map(annotationDataItems[i]);
            }
            return annotations;
        }

        private _getEvaluatorPatternMapper(
            annotations: Array<Ts.Annotations.IEntityAnnotation>): Ts.Evaluation.IEvaluatorPatternMapper {

            var annotationNamesBySymbol: Ts.IStringDictionary<string> = {};
            for (var i = 0; i < annotations.length; i++) {
                annotationNamesBySymbol[annotations[i].symbol] = annotations[i].name;
            }

            return this._patternMapper.with(annotationNamesBySymbol);
        }

        private _mapTurnInteractions(turnInteractionData: string): Array<Pieces.InteractionType> {
            var turnInteractionDataItems = turnInteractionData.split("^");
            var turnInteractions = new Array<Pieces.InteractionType>(turnInteractionDataItems.length);
            for (var i = 0; i < turnInteractionDataItems.length; i++) {
                turnInteractions[i] = parseInt(turnInteractionDataItems[i]);
            }
            return turnInteractions;
        }

        private _mapPieceDefinitions(
            pieceDefinitionData: string,
            evaluatorPatternMapper: Ts.Evaluation.IEvaluatorPatternMapper): Ts.IStringDictionary<Pieces.PieceDefinition> {

            var pieceDefinitionMapper = new Pieces.PieceDefinitionMapper(evaluatorPatternMapper);

            var pieceDefinitionDataItems = pieceDefinitionData.split("_");
            var pieceDefinitions: Ts.IStringDictionary<Pieces.PieceDefinition> = {};
            for (var i = 0; i < pieceDefinitionDataItems.length; i++) {
                var pieceDefinition = pieceDefinitionMapper.map(pieceDefinitionDataItems[i]);
                pieceDefinitions[pieceDefinition.id] = pieceDefinition;
            }
            return pieceDefinitions;
        }

        private _mapPieceConfigDataSet(pieceConfigData: string): Array<Pieces.PieceConfigData> {
            var pieceConfigDataItems = pieceConfigData.split("`");
            var pieceConfigs = new Array<Pieces.PieceConfigData>(pieceConfigDataItems.length);
            for (var i = 0; i < pieceConfigDataItems.length; i++) {
                pieceConfigs[i] = this._mapPieceConfigData(pieceConfigDataItems[i]);
            }
            return pieceConfigs;
        }

        private _mapPieceConfigData(pieceConfigData: string): Pieces.PieceConfigData {
            var pieceConfigDataItems = pieceConfigData.split("^");

            var pieceDefinitionId = pieceConfigDataItems[0];
            var row = parseInt(pieceConfigDataItems[1]);
            var column = parseInt(pieceConfigDataItems[2]);
            var location = TypeScript.CoordinatesRegistry.INSTANCE.get(row, column);

            return new Pieces.PieceConfigData(pieceDefinitionId, location);
        }

        private _mapEventMappings(
            eventMappingData: string,
            evaluatorPatternMapper: Ts.Evaluation.IEvaluatorPatternMapper): Array<Ts.EventMapping> {

            var eventMappingDataItems = eventMappingData.split("`");
            var eventMappings = new Array<Ts.EventMapping>(eventMappingDataItems.length);
            for (var i = 0; i < eventMappingDataItems.length; i++) {
                eventMappings[i] = this._mapEventMapping(eventMappingDataItems[i], evaluatorPatternMapper);
            }
            return eventMappings;
        }

        private _mapEventMapping(
            eventMappingData: string,
            evaluatorPatternMapper: Ts.Evaluation.IEvaluatorPatternMapper): Ts.EventMapping {

            var eventMappingDataItems = eventMappingData.split("^");

            var triggeringEventNames = eventMappingDataItems[0].split("_");
            for (var i = 0; i < triggeringEventNames.length; i++) {
                triggeringEventNames[i] = evaluatorPatternMapper.expand(triggeringEventNames[i]);
            }

            var triggerEvaluatorPattern = evaluatorPatternMapper.map(eventMappingDataItems[1]);
            var triggerEvaluator = TypeScript.Evaluation.EvaluatorParser.INSTANCE.parse(triggerEvaluatorPattern);
            var triggeredEventName = evaluatorPatternMapper.expand(eventMappingDataItems[2]);
            var triggeredEventDataMemberName = evaluatorPatternMapper.expand(eventMappingDataItems[3]);

            return new TypeScript.EventMapping(
                triggeringEventNames,
                triggerEvaluator,
                triggeredEventName,
                triggeredEventDataMemberName);
        }
    }
}