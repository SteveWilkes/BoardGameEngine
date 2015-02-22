module AgileObjects.BoardGameEngine.Games {

    export class GameEntityAnnotationMapper extends TypeScript.Annotations.EntityAnnotationMapperBase {
        constructor(patternExpander: Ts.Evaluation.IEvaluatorPatternExpander) {
            super(patternExpander, {
                "bt": Boards.BoardTileAnnotation
            });
        }
    }
}