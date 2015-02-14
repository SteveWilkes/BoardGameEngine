module AgileObjects.BoardGameEngine.Pieces.Evaluation {

    export class PieceEvaluatorMapper extends TypeScript.Evaluation.EvaluatorMapperBase {
        static INSTANCE = new PieceEvaluatorMapper(
            { "p": "piece", "t": "team", "l": "location" },
            { "d": "definitionId", "id": "id" },
            { "io": "isOccupied" });
    }
}