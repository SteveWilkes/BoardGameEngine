module AgileObjects.TypeScript {

    var _missing = {};

    export class ValueParser {
        static MISSING = _missing;
        static INSTANCE = new ValueParser();

        public getPropertyValue(parentObject: any, memberNameParts: Array<string>): any {
            var propertyValue: any = null;

            for (var i = 0; i < memberNameParts.length; i++) {
                if (parentObject == null) { return _missing; }

                propertyValue = parentObject[memberNameParts[i]];

                if (typeof propertyValue === "function") {
                    propertyValue = propertyValue.call(parentObject);
                }

                parentObject = propertyValue;
            }

            return propertyValue;
        }
    }
}