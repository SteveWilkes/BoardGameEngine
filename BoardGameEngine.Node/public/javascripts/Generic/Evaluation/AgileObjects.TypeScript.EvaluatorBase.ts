module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorBase<T> implements IEvaluator<T> {
        private _memberNameParts: Array<string>;
        private _derivedAllowedValuePaths: Array<Array<string>>;

        constructor(memberName: string, private _allowedValues: Array<any>) {
            this._memberNameParts = memberName.split(".");
            this._derivedAllowedValuePaths = new Array<Array<string>>();

            for (var i = this._allowedValues.length - 1; i >= 0; i--) {
                var value = this._allowedValues[i];
                if ((typeof value === "string")) {
                    var stringValue = <string>value;
                    if (stringValue.startsWith("D:")) {
                        this._allowedValues = this._allowedValues.splice(i, 1);
                        this._derivedAllowedValuePaths.unshift(stringValue.substring(2).split("."));
                    }
                }
            }
        }

        public evaluate(item: T): boolean {
            var propertyValue = ValueParser.INSTANCE.getPropertyValue(item, this._memberNameParts);

            if (this._valueIsAllowed(propertyValue)) { return true; }

            for (var i = 0; i < this._derivedAllowedValuePaths.length; i++) {
                var derivedPropertyValue = ValueParser.INSTANCE.getPropertyValue(item, this._derivedAllowedValuePaths[i]);

                if (propertyValue === derivedPropertyValue) { return true; }
            }

            return false;
        }

        private _valueIsAllowed(value: any): boolean {
            if (value === ValueParser.MISSING) { return false; }

            if (this._allowedValues.length === 0) { return value !== undefined; }

            return this._allowedValues.indexOf(value) > -1;
        }
    }
}