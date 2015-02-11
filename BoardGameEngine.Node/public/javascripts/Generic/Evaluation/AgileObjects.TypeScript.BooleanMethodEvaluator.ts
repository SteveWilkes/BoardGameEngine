module AgileObjects.TypeScript.Evaluation {
    var _booleanTrue = [true];

    export class BooleanMethodEvaluator<T> extends EvaluatorBase<T> {
        constructor(methodName: string) {
            super(methodName, _booleanTrue);
        }
    }
}