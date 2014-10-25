module AgileObjects.StrategyGame.Game {

    export class PieceFactory {

        private _definitions: AgileObjects.TypeScript.IStringDictionary<PieceDefinition>;

        constructor() {
            this._definitions = {
                "1": new PieceDefinition("1", "Blah", "/Content/Pieces/Example.png", "1")
            };
        }

        public createPiece(definitionId: string): Piece {
            return this._definitions[definitionId].createPiece("1");
        }
    }

    game.service("$pieceFactory", PieceFactory);
}