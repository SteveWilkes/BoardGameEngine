module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorMapper {
        constructor(private _patternMapper: IEvaluatorPatternMapper) { }

        public map<T>(evaluatorData: string): IEvaluator<T> {
            if ((evaluatorData || "").length === 0) {
                return AlwaysTrueEvaluator.INSTANCE;
            }

            var evaluatorPattern = this._patternMapper.map(evaluatorData);

            return EvaluatorParser.INSTANCE.parse(evaluatorPattern);
        }
    }
}