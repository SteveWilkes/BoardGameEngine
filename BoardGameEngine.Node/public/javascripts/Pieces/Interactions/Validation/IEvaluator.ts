module AgileObjects.BoardGameEngine.Pieces {

    export interface IEvaluator<T> {
        evaluate(item: T): boolean
    }
}