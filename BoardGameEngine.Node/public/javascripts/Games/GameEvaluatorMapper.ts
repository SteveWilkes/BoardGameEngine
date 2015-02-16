module AgileObjects.BoardGameEngine.Games {

    export class GameEvaluatorMapper extends TypeScript.Evaluation.EvaluatorMapperBase {
        constructor(annotationNamesBySymbol: Ts.IStringDictionary<string>) {
            var propertyNamesBySymbol: Ts.IStringDictionary<string> = { "d": "definitionId", "id": "id" };
            var booleanMethodNamesBySymbol: Ts.IStringDictionary<string> = { "io": "isOccupied" };

            super(
                this._combine({ "p": "piece", "t": "team", "l": "location" }, annotationNamesBySymbol),
                propertyNamesBySymbol,
                booleanMethodNamesBySymbol);
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