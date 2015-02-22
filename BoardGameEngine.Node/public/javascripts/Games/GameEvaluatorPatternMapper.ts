module AgileObjects.BoardGameEngine.Games {

    export class GameEvaluatorPatternMapper extends TypeScript.Evaluation.EvaluatorPatternMapperBase {
        static INSTANCE = new GameEvaluatorPatternMapper();

        constructor() {
            super([
                new TypeScript.Evaluation.EntityData("p", "piece", "p"),
                new TypeScript.Evaluation.EntityData("t", "team", "p"),
                new TypeScript.Evaluation.EntityData("l", "location", "p"),
                new TypeScript.Evaluation.EntityData("d", "definitionId", "p"),
                new TypeScript.Evaluation.EntityData("id", "id", "p"),
                new TypeScript.Evaluation.EntityData("io", "isOccupied", "bm"),
                new TypeScript.Evaluation.EntityData("pmd", "pieceMoved", "e"),
                new TypeScript.Evaluation.EntityData("td", "teamDefeated", "e")
            ]);
        }
    }
}