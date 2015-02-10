module AgileObjects.TypeScript.Evaluation {

    export class PropertyEvaluator<T> {
        constructor(private _propertyName, private _allowedValues: Array<any>) { }

        public evaluate(item: T): boolean {
            var propertyValue = item[this._propertyName];
            return this._allowedValues.indexOf(propertyValue) > -1;
        }
    }
}