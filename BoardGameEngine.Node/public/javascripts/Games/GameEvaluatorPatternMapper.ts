module AgileObjects.BoardGameEngine.Games {

    var booleanMethod = "bm";
    var event = "e";
    var property = "p";

    export class GameEvaluatorPatternMapper extends TypeScript.Evaluation.EvaluatorPatternMapperBase {
        static INSTANCE = new GameEvaluatorPatternMapper();

        constructor() {
            super([
                new TypeScript.Evaluation.EntityData("d", "definitionId", property),
                new TypeScript.Evaluation.EntityData("g", "game", property),
                new TypeScript.Evaluation.EntityData("h", "history", property),
                new TypeScript.Evaluation.EntityData("id", "id", property),
                new TypeScript.Evaluation.EntityData("l", "location", property),
                new TypeScript.Evaluation.EntityData("p", "piece", property),
                new TypeScript.Evaluation.EntityData("pa", "previousAction", property),
                new TypeScript.Evaluation.EntityData("st", "status", property),
                new TypeScript.Evaluation.EntityData("t", "team", property),

                new TypeScript.Evaluation.EntityData("io", "isOccupied", booleanMethod),

                new TypeScript.Evaluation.EntityData("pmd", "pieceMoved", event),
                new TypeScript.Evaluation.EntityData("td", "teamDefeated", event),
                new TypeScript.Evaluation.EntityData("gw", "gameWon", event)
            ]);
        }
    }
}