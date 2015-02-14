module AgileObjects.BoardGameEngine.Pieces.Evaluation {

    export class PieceEvaluatorMapper extends TypeScript.Evaluation.EvaluatorMapperBase {
        static DEFAULT = new PieceEvaluatorMapper({}, {});

        constructor(
            gameTypePropertyNamesBySymbol: Ts.IStringDictionary<string>,
            gameTypeBooleanMethodNamesBySymbol: Ts.IStringDictionary<string>) {

            var propertyNamesBySymbol: Ts.IStringDictionary<string> = { "d": "definitionId", "id": "id" };
            var booleanMethodNamesBySymbol: Ts.IStringDictionary<string> = { "io": "isOccupied" };

            super(
                { "p": "piece", "t": "team", "l": "location" },
                this._combine(propertyNamesBySymbol, gameTypePropertyNamesBySymbol),
                this._combine(booleanMethodNamesBySymbol, gameTypeBooleanMethodNamesBySymbol));
        }

        private _combine(...dictionaries: Array<Ts.IStringDictionary<string>>): Ts.IStringDictionary<string> {
            for (var i = 1; i < dictionaries.length; i++) {
                for (var symbolName in dictionaries[i]) {
                    dictionaries[0][symbolName] = dictionaries[i][symbolName];
                }
            }

            return dictionaries[0];
        }
    }
}