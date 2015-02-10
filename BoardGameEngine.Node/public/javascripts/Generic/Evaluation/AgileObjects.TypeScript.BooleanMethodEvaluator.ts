module AgileObjects.TypeScript.Evaluation {
    export class BooleanMethodEvaluator<T> {
        constructor(private _methodName: string) { }

        public evaluate(item: T): boolean {
            return item[this._methodName]();
        }
    }
}