module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorPatternExpanderBase implements IEvaluatorPatternExpander {
        private _symbolMatchersByReplacement: IStringDictionary<RegExp>;

        constructor(entityData: Array<EntityData>) {

            this._symbolMatchersByReplacement = {};

            for (var i = 0; i < entityData.length; i++) {
                var matcher = new RegExp("\\b" + entityData[i].symbol + "(\\b)", "g");
                var replacement = entityData[i].name + "$1";

                this._symbolMatchersByReplacement[replacement] = matcher;
            }
        }

        public expand(pattern: string): string {
            for (var replacement in this._symbolMatchersByReplacement) {
                pattern = pattern.replace(this._symbolMatchersByReplacement[replacement], replacement);
            }
            return pattern;
        }
    }
}