module AgileObjects.BoardGameEngine.Pieces {

    export class CompositeAndEvaluator<T> implements IEvaluator<T> {
        constructor(private _evaluators: Array<IEvaluator<T>>) { }

        public evaluate(item: T): boolean {
            for (var i = 0; i < this._evaluators.length; i++) {
                if (!this._evaluators[i].evaluate(item)) {
                    return false;
                }
            }
            return true;
        }
    }
}