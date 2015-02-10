module AgileObjects.TypeScript.Evaluation {

    export interface IEvaluator<T> {
        evaluate(item: T): boolean
    }
}