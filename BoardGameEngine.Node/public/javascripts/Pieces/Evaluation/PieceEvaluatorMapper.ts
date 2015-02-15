module AgileObjects.BoardGameEngine.Pieces.Evaluation {

    export class PieceEvaluatorMapper extends TypeScript.Evaluation.EvaluatorMapperBase {
        constructor() {
            var propertyNamesBySymbol: Ts.IStringDictionary<string> = { "d": "definitionId", "id": "id" };
            var booleanMethodNamesBySymbol: Ts.IStringDictionary<string> = { "io": "isOccupied" };

            super(
                { "p": "piece", "t": "team", "l": "location" },
                propertyNamesBySymbol,
                booleanMethodNamesBySymbol);
        }
    }
}