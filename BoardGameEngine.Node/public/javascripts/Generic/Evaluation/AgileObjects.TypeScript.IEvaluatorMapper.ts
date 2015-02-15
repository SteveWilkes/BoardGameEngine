module AgileObjects.TypeScript.Evaluation {

    export interface IEvaluatorMapper {
        expand(pattern: string): string;
        map(pattern: string): string;
    }
}