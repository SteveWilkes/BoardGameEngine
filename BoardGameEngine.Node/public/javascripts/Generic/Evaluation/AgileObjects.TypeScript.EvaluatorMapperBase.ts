module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorMapperBase {
        private _symbolMatchersByReplacement: Ts.IStringDictionary<RegExp>;

        constructor(
            namesBySymbol: Ts.IStringDictionary<string>,
            propertyNamesBySymbol: Ts.IStringDictionary<string>,
            booleanMethodNamesBySymbol: Ts.IStringDictionary<string>) {

            this._symbolMatchersByReplacement = {};

            var symbol, allSymbols = "";

            for (symbol in namesBySymbol) {
                allSymbols += symbol;
            }

            var memberSymbol, replacement, matcher;

            for (memberSymbol in propertyNamesBySymbol) {
                replacement = "pe{$1" + propertyNamesBySymbol[memberSymbol] + ",[$2]}";
                matcher = new RegExp("\\b((?:[" + allSymbols + "]\\.)*)" + memberSymbol + "=?([0-9,a-z\\.D:]+)?\\b", "g");
                this._symbolMatchersByReplacement[replacement] = matcher;
            }

            for (memberSymbol in booleanMethodNamesBySymbol) {
                replacement = "bme{$1" + booleanMethodNamesBySymbol[memberSymbol] + "}";
                matcher = new RegExp("\\b((?:[" + allSymbols + "]\\.)*)" + memberSymbol + "\\b", "g");
                this._symbolMatchersByReplacement[replacement] = matcher;
            }

            for (symbol in namesBySymbol) {
                matcher = new RegExp("\\b" + symbol + "\\.", "g");
                this._symbolMatchersByReplacement[namesBySymbol[symbol] + "."] = matcher;
            }
        }

        public map(pattern: string): string {
            for (var replacement in this._symbolMatchersByReplacement) {
                var matcher = this._symbolMatchersByReplacement[replacement];
                pattern = pattern.replace(matcher, replacement);
            }
            return pattern;
        }
    }
}