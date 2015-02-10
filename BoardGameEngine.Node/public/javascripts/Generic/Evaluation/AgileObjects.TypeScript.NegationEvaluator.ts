module AgileObjects.TypeScript.Evaluation {

    export class NegationEvaluator<T> implements IEvaluator<T> {
        constructor(private _evaluator: IEvaluator<T>) { }

        public evaluate(item: T): boolean {
            var result = this._evaluator.evaluate(item);
            return !result;
        }
    }
}