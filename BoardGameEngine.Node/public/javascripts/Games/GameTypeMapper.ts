module AgileObjects.BoardGameEngine.Games {

    export class GameTypeMapper {
        constructor(
            private _getBoardTypeQuery: Ts.IGetQuery<Boards.BoardType>,
            private _annotationMapper: Ts.Annotations.IEntityAnnotationMapper) { }

        public map(gameTypeData: string): GameType {
            var gameTypeDataItems = gameTypeData.split("/");
            var gameTypeId = gameTypeDataItems[0];
            var boardTypeId = gameTypeDataItems[1];

            var annotations = this._mapEntityAnnotations(gameTypeDataItems[2]);
            var evaluatorMapper = this._getEvaluatorMapper(annotations);

            return new GameType(
                gameTypeId,
                this._getBoardTypeQuery.execute(boardTypeId),
                this._mapTurnInteractions(gameTypeDataItems[3]),
                new Pieces.PieceDataSet(
                    this._mapPieceDefinitions(gameTypeDataItems[4], evaluatorMapper),
                    this._mapPieceConfigDataSet(gameTypeDataItems[5])),
                annotations);
        }

        private _mapEntityAnnotations(annotationData: string): Array<Ts.Annotations.IEntityAnnotation> {
            var annotationDataItems = annotationData.split("`");
            var annotations = new Array<Ts.Annotations.IEntityAnnotation>(annotationDataItems.length);
            for (var i = 0; i < annotationDataItems.length; i++) {
                annotations[i] = this._annotationMapper.map(annotationDataItems[i]);
            }
            return annotations;
        }

        private _getEvaluatorMapper(annotations: Array<Ts.Annotations.IEntityAnnotation>): Ts.Evaluation.IEvaluatorMapper {
            var annotationNamesBySymbol: Ts.IStringDictionary<string> = {};
            for (var i = 0; i < annotations.length; i++) {
                annotationNamesBySymbol[annotations[i].symbol] = annotations[i].name;
            }

            return new GameEvaluatorMapper(annotationNamesBySymbol);
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
            evaluatorMapper: Ts.Evaluation.IEvaluatorMapper): Ts.IStringDictionary<Pieces.PieceDefinition> {

            var pieceDefinitionMapper = new Pieces.PieceDefinitionMapper(evaluatorMapper);

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
    }
}