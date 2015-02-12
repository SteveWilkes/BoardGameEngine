module AgileObjects.BoardGameEngine.Games {

    import Ts = TypeScript;

    export class GameTypeMapper {
        constructor(private _getBoardTypeQuery: Ts.IGetQuery<Boards.BoardType>) { }

        public map(gameTypeData: string): GameType {
            var gameTypeDataItems = gameTypeData.split("/");
            var gameTypeId = gameTypeDataItems[0];
            var boardTypeId = gameTypeDataItems[1];

            return new GameType(
                gameTypeId,
                this._getBoardTypeQuery.execute(boardTypeId),
                this._mapTurnInteractions(gameTypeDataItems[2]),
                new Pieces.PieceDataSet(
                    this._mapPieceDefinitions(gameTypeDataItems[3]),
                    this._mapPieceConfigDataSet(gameTypeDataItems[4])));
        }

        private _mapTurnInteractions(turnInteractionData: string): Array<Pieces.InteractionType> {
            var turnInteractionDataItems = turnInteractionData.split("^");
            var turnInteractions = new Array<Pieces.InteractionType>(turnInteractionDataItems.length);
            for (var i = 0; i < turnInteractionDataItems.length; i++) {
                turnInteractions[i] = parseInt(turnInteractionDataItems[i]);
            }
            return turnInteractions;
        }

        private _mapPieceDefinitions(pieceDefinitionData: string): Ts.IStringDictionary<Pieces.PieceDefinition> {
            var pieceDefinitionDataItems = pieceDefinitionData.split("_");
            var pieceDefinitions: Ts.IStringDictionary<Pieces.PieceDefinition> = {};
            for (var i = 0; i < pieceDefinitionDataItems.length; i++) {
                var pieceDefinition = Pieces.PieceDefinitionMapper.INSTANCE.map(pieceDefinitionDataItems[i]);
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
            var location = Ts.CoordinatesRegistry.INSTANCE.get(row, column);

            return new Pieces.PieceConfigData(pieceDefinitionId, location);
        }
    }
}