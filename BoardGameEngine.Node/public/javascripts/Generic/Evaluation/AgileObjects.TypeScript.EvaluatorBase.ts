module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorBase<T> implements IEvaluator<T> {
        private _memberNameParts: Array<string>;

        constructor(memberName: string, private _allowedValues: Array<any>) {
            this._memberNameParts = memberName.split(".");
        }

        public evaluate(item: T): any {
            var parentObject = item;
            var propertyValue: any = null;

            for (var i = 0; i < this._memberNameParts.length; i++) {
                if (parentObject == null) { return false; }
                propertyValue = parentObject[this._memberNameParts[i]];
                if (typeof propertyValue === "function") {
                    propertyValue = propertyValue();
                }
                parentObject = propertyValue;
            }

            return this._allowedValues.indexOf(propertyValue) > -1;
        }
    }
}