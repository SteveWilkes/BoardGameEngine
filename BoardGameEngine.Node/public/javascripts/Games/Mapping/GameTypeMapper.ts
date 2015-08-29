module AgileObjects.BoardGameEngine.Games {

    export class GameTypeMapper {
        constructor(
            private _getBoardTypeQuery: Ts.IGetQuery<Boards.BoardType>,
            private _annotationMapper: Ts.Annotations.IEntityAnnotationMapper,
            private _patternMapper: Ts.Evaluation.IEvaluatorPatternMapper) { }

        public map(gameTypeData: string, callback: (err: Error, gameType?: GameType) => void): void {
            var gameTypeDataItems = gameTypeData.split("/");
            var gameTypeId = gameTypeDataItems[0];
            var boardTypeId = gameTypeDataItems[1];
            var maximumNumberOfTeams = parseInt(gameTypeDataItems[2]);

            var annotations = this._mapEntityAnnotations(gameTypeDataItems[3]);
            var evaluatorPatternMapper = this._getEvaluatorPatternMapper(annotations);
            var evaluatorMapper = new TypeScript.Evaluation.EvaluatorMapper(evaluatorPatternMapper);
            
            this._getBoardTypeQuery.execute(boardTypeId,(getBoardTypeError, boardType) => {
                if (getBoardTypeError) {
                    callback(getBoardTypeError);
                    return;
                }

                var gameType = new GameType(
                    gameTypeId,
                    boardType,
                    maximumNumberOfTeams,
                    this._mapTurnDefinition(gameTypeDataItems[4], evaluatorMapper),
                    new Pieces.PieceDataSet(
                        this._mapPieceDefinitions(gameTypeDataItems[5], evaluatorMapper),
                        this._mapPieceConfigDataSet(gameTypeDataItems[6])),
                    annotations,
                    this._mapEventMappings(gameTypeDataItems[7], evaluatorPatternMapper));

                callback(null, gameType);
            });
        }

        private _mapEntityAnnotations(annotationData: string): Array<Ts.Annotations.IEntityAnnotation> {
            var annotationDataItems = annotationData.split("_");
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

        private _mapTurnDefinition(
            turnDefinitionData: string,
            evaluatorMapper: Ts.Evaluation.EvaluatorMapper): I.TurnDefinition {

            var turnDefinitionDataItems = turnDefinitionData.split("_");
            var turnInteractionDefinitions = new Array<I.TurnInteractionDefinition>(turnDefinitionDataItems.length);
            for (var i = 0; i < turnDefinitionDataItems.length; i++) {
                turnInteractionDefinitions[i] = this._mapTurnInteractionDefinition(
                    turnDefinitionDataItems[i],
                    evaluatorMapper);
            }
            return new Interactions.TurnDefinition(turnInteractionDefinitions);
        }

        private _mapTurnInteractionDefinition(
            interactionDefinitionData: string,
            evaluatorMapper: Ts.Evaluation.EvaluatorMapper): I.TurnInteractionDefinition {

            var interactionDefinitionDataItems = interactionDefinitionData.split("`");

            return new Interactions.TurnInteractionDefinition(
                parseInt(interactionDefinitionDataItems[0]),
                evaluatorMapper.map<I.PotentialInteractionsData>(interactionDefinitionDataItems[1]));
        }

        private _mapPieceDefinitions(
            pieceDefinitionData: string,
            evaluatorMapper: Ts.Evaluation.EvaluatorMapper): Ts.IStringDictionary<P.PieceDefinition> {

            var pieceDefinitionMapper = new Pieces.PieceDefinitionMapper(evaluatorMapper);

            var pieceDefinitionDataItems = pieceDefinitionData.split("_");
            var pieceDefinitions: Ts.IStringDictionary<P.PieceDefinition> = {};
            for (var i = 0; i < pieceDefinitionDataItems.length; i++) {
                var pieceDefinition = pieceDefinitionMapper.map(pieceDefinitionDataItems[i]);
                pieceDefinitions[pieceDefinition.id] = pieceDefinition;
            }
            return pieceDefinitions;
        }

        private _mapPieceConfigDataSet(pieceConfigData: string): Array<P.PieceConfigData> {
            var pieceConfigDataItems = pieceConfigData.split("`");
            var pieceConfigs = new Array<P.PieceConfigData>(pieceConfigDataItems.length);
            for (var i = 0; i < pieceConfigDataItems.length; i++) {
                pieceConfigs[i] = this._mapPieceConfigData(pieceConfigDataItems[i]);
            }
            return pieceConfigs;
        }

        private _mapPieceConfigData(pieceConfigData: string): P.PieceConfigData {
            var pieceConfigDataItems = pieceConfigData.split("^");

            var pieceDefinitionId = pieceConfigDataItems[0];
            var row = parseInt(pieceConfigDataItems[1]);
            var column = parseInt(pieceConfigDataItems[2]);
            var location = TypeScript.CoordinatesLibrary.INSTANCE.get(row, column);

            return new Pieces.PieceConfigData(pieceDefinitionId, location);
        }

        private _mapEventMappings(
            eventMappingData: string,
            evaluatorPatternMapper: Ts.Evaluation.IEvaluatorPatternMapper): Array<Ts.EventMapping> {

            var eventMappingDataItems = eventMappingData.split("_");
            var eventMappings = new Array<Ts.EventMapping>(eventMappingDataItems.length);
            for (var i = 0; i < eventMappingDataItems.length; i++) {
                eventMappings[i] = this._mapEventMapping(eventMappingDataItems[i], evaluatorPatternMapper);
            }
            return eventMappings;
        }

        private _mapEventMapping(
            eventMappingData: string,
            evaluatorPatternMapper: Ts.Evaluation.IEvaluatorPatternMapper): Ts.EventMapping {

            var eventMappingDataItems = eventMappingData.split("`");

            var triggeringEventNames = eventMappingDataItems[0].split("^");
            for (var i = 0; i < triggeringEventNames.length; i++) {
                triggeringEventNames[i] = evaluatorPatternMapper.expand(triggeringEventNames[i]);
            }

            var triggerEvaluatorPattern = evaluatorPatternMapper.map(eventMappingDataItems[1]);
            var triggerEvaluator = TypeScript.Evaluation.EvaluatorParser.INSTANCE.parse(triggerEvaluatorPattern);
            var triggeredEventName = evaluatorPatternMapper.expand(eventMappingDataItems[2]);
            var triggeredEventDataPath = evaluatorPatternMapper.expand(eventMappingDataItems[3]);

            return new TypeScript.EventMapping(
                triggeringEventNames,
                triggerEvaluator,
                triggeredEventName,
                triggeredEventDataPath);
        }
    }
}