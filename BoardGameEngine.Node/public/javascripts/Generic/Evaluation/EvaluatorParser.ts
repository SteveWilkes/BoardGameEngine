module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorParser {
        static INSTANCE = new EvaluatorParser();

        public parse<T>(pattern: string): IEvaluator<T> {
            return this._parseEvaluator<T>(pattern);
        }

        private _parseEvaluator<T>(segment: string): IEvaluator<T> {
            var evaluatorData = segment.substring(0, segment.length - 1).split("{");
            var constructorData = evaluatorData[1].split(",");
            var propertyName = constructorData[0];
            var allowedValues = constructorData.slice(1);

            return new PropertyEvaluator<T>(propertyName, allowedValues);
        }
    }
}