module AgileObjects.TypeScript.Evaluation {

    var _evaluatorFactories = {
        "pe": <T>(propertyName: string, allowedValues: Array<string>) => new PropertyEvaluator<T>(propertyName, allowedValues),
        "bme": <T>(methodName: string) => new BooleanMethodEvaluator<T>(methodName)
    };

    var _symbolMatcher = new RegExp("[\\(\\)\\{\\}\\[\\],+\\|!]");
    var _groupMatcher = new RegExp("[\\(\\)]");

    export class EvaluatorParser {
        static INSTANCE = new EvaluatorParser();

        public parse<T>(pattern: string): IEvaluator<T> {
            var evaluatorSet = new EvaluatorSet<T>();
            var evaluatorData: EvaluatorData = null;
            var match: RegExpExecArray;
            while (match = _symbolMatcher.exec(pattern)) {
                switch (match[0]) {
                    case "(":
                        match = this._getGroupEndMatch(pattern);
                        var groupPattern = pattern.substring(1, match.index + 1);
                        evaluatorSet.add(this.parse<T>(groupPattern));
                        break;
                    case ")":
                        break;
                    case "!":
                        evaluatorSet.negate = true;
                        break;
                    case "{":
                        evaluatorData = new EvaluatorData(pattern.substring(0, match.index));
                        break;
                    case "}":
                        // ReSharper disable once QualifiedExpressionMaybeNull
                        evaluatorData.completeConstructorArguments(match, pattern);
                        var evaluatorFactory = _evaluatorFactories[evaluatorData.type];
                        evaluatorSet.add(evaluatorFactory.apply(null, evaluatorData.constructorArguments));
                        break;
                    case "[":
                        // ReSharper disable once QualifiedExpressionMaybeNull
                        evaluatorData.constructorArgument = new Array<any>();
                        break;
                    case "]":
                        // ReSharper disable once QualifiedExpressionMaybeNull
                        evaluatorData.completeConstructorArgumentArray(match, pattern);
                        break;
                    case ",":
                        // ReSharper disable once QualifiedExpressionMaybeNull
                        evaluatorData.addConstructorArgument(pattern.substring(0, match.index));
                        break;
                    case "+":
                        evaluatorSet.setToAnd();
                        break;
                    case "|":
                        evaluatorSet.setToOr();
                        break;
                }
                pattern = pattern.substring(match.index + 1);
            }

            if (evaluatorSet.evaluator !== null) { return evaluatorSet.evaluator; }

            throw new Error("Unable to parse Evaluator");
        }

        private _getGroupEndMatch(pattern: string): RegExpExecArray {
            var groupMatch: RegExpExecArray;
            var numberOfOpenSubGroups = 0;
            while (groupMatch = _groupMatcher.exec(pattern.substring(1))) {
                if (groupMatch[0] === "(") {
                    ++numberOfOpenSubGroups;
                } else {
                    if (numberOfOpenSubGroups === 0) {
                        return groupMatch;
                    } else {
                        --numberOfOpenSubGroups;
                    }
                }
            }

            throw new Error("Unable to parse group end match");
        }
    }
}