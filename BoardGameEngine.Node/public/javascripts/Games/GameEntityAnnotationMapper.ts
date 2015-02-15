module AgileObjects.BoardGameEngine.Games {

    export class GameEntityAnnotationMapper extends TypeScript.Annotations.EntityAnnotationMapperBase {
        constructor(evaluatorMapper: Ts.Evaluation.IEvaluatorMapper) {
            super(evaluatorMapper, {
                "bt": Boards.BoardTileAnnotation
            });
        }
    }
}