module AgileObjects.TypeScript.Evaluation {

    export interface IEvaluatorPatternMapper extends IEvaluatorPatternExpander {
        with(annotationNamesBySymbol): IEvaluatorPatternMapper;
        map(pattern: string): string;
    }
}