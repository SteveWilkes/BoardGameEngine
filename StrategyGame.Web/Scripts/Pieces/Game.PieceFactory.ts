module AgileObjects.StrategyGame.Game {

    export class PieceFactory {
        private _definitions: AgileObjects.TypeScript.IStringDictionary<PieceDefinition>;
        private _nextPieceId: number;

        constructor() {
            this._definitions = {
                "1": new PieceDefinition("1", "Bomb", "/Content/Pieces/Bomb.png", "1"),
                "2": new PieceDefinition("2", "Example", "/Content/Pieces/Example.png", "2")
            };
            this._nextPieceId = 1;
        }

        public createPiece(definitionId: string): Piece {
            var pieceId = this._nextPieceId++;
            return this._definitions[definitionId].createPiece("piece-" + pieceId);
        }
    }

    angular
        .module(strategyGameApp)
        .service("$pieceFactory", PieceFactory);
}