module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorMapperBase {
        private _symbolMatchersByReplacement: Ts.IStringDictionary<RegExp>;
        private _allSymbolMatchersByReplacement: Ts.IStringDictionary<RegExp>;

        constructor(
            namesBySymbol: Ts.IStringDictionary<string>,
            propertyNamesBySymbol: Ts.IStringDictionary<string>,
            booleanMethodNamesBySymbol: Ts.IStringDictionary<string>) {

            this._symbolMatchersByReplacement = {};
            this._allSymbolMatchersByReplacement = {};

            var symbol, allSymbols = "";

            for (symbol in namesBySymbol) {
                allSymbols += symbol;
            }

            var memberSymbol, replacement, matcher;

            for (memberSymbol in propertyNamesBySymbol) {
                replacement = "pe{$1" + propertyNamesBySymbol[memberSymbol] + ",[$2]}";
                matcher = new RegExp("\\b((?:[" + allSymbols + "]\\.)*)" + memberSymbol + "=?([0-9,a-z\\.D:]+)?\\b", "g");
                this._allSymbolMatchersByReplacement[replacement] = matcher;
            }
            for (memberSymbol in booleanMethodNamesBySymbol) {
                replacement = "bme{$1" + booleanMethodNamesBySymbol[memberSymbol] + "}";
                matcher = new RegExp("\\b((?:[" + allSymbols + "]\\.)*)" + memberSymbol + "\\b", "g");
                this._allSymbolMatchersByReplacement[replacement] = matcher;
            }
            for (symbol in namesBySymbol) {
                matcher = new RegExp("\\b" + symbol + "\\.", "g");
                replacement = namesBySymbol[symbol] + ".";
                this._symbolMatchersByReplacement[replacement] =
                this._allSymbolMatchersByReplacement[replacement] = matcher;
            }
        }

        public map(pattern: string): string {
            return this._map(pattern, this._allSymbolMatchersByReplacement);
        }

        public expand(pattern: string): string {
            return this._map(pattern, this._symbolMatchersByReplacement);
        }

        private _map(pattern: string, matchersByReplacement: Ts.IStringDictionary<RegExp>): string {
            for (var replacement in matchersByReplacement) {
                var matcher = matchersByReplacement[replacement];
                pattern = pattern.replace(matcher, replacement);
            }
            return pattern;
        }
    }
}