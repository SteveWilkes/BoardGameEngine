module AgileObjects.TypeScript.Evaluation {

    var _evaluatorFactories = {
        "pe": <T>(propertyName: string, allowedValues: Array<string>) => new PropertyEvaluator<T>(propertyName, allowedValues),
        "bme": <T>(methodName: string) => new BooleanMethodEvaluator<T>(methodName)
    };

    var _symbolMatcher = new RegExp("[\\(\\)\\{\\}\\[\\],+\\|!]{1}");
    var _groupMatcher = new RegExp("[\\(\\)]{1}");

    export class EvaluatorParser {
        static INSTANCE = new EvaluatorParser();

        public parse<T>(pattern: string): IEvaluator<T> {
            console.log("pattern = " + pattern);
            var evaluatorSet = new EvaluatorSet<T>();
            var match: RegExpExecArray;
            var evaluatorType = "";
            var constructorArguments: Array<any> = null;
            var constructorArgument: any = null;
            while (match = _symbolMatcher.exec(pattern)) {
                console.log("match = " + match[0] + " (" + match.index + ")");
                switch (match[0]) {
                    case "(":
                        console.log("Start of group");
                        match = this._getGroupEndMatch(pattern);
                        var groupPattern = pattern.substring(1, match.index + 1);
                        evaluatorSet.add(this.parse<T>(groupPattern));
                        break;
                    case ")":
                        console.log("End of group");
                        break;
                    case "!":
                        evaluatorSet.negate = true;
                        console.log("Negation");
                        break;
                    case "{":
                        // start of constructor arguments
                        evaluatorType = pattern.substring(0, match.index);
                        constructorArguments = new Array<any>();
                        console.log("start of constructor arguments, evaluatorType = " + evaluatorType);
                        break;
                    case "}":
                        // end of constructor arguments
                        console.log("end of constructor arguments");
                        if (match.index > 0) {
                            constructorArgument = pattern.substring(0, match.index);
                            constructorArguments.push(constructorArgument);
                        }
                        console.log("constructorArguments = " + constructorArguments.join(", "));
                        evaluatorSet.add(_evaluatorFactories[evaluatorType].apply(null, constructorArguments));
                        break;
                    case "[":
                        // start of array
                        console.log("start of array");
                        constructorArgument = new Array<any>();
                        break;
                    case "]":
                        // end of array
                        console.log("end of array");
                        if (match.index > 0) {
                            // ReSharper disable once QualifiedExpressionMaybeNull
                            constructorArgument.push(pattern.substring(0, match.index));
                        }
                        // ReSharper disable once QualifiedExpressionMaybeNull
                        constructorArguments.push(constructorArgument);
                        console.log("Added array of length " + constructorArguments[constructorArguments.length - 1].length);
                        constructorArgument = null;
                        break;
                    case ",":
                        // element separator
                        var value = pattern.substring(0, match.index);
                        ((constructorArgument instanceof Array)
                            ? constructorArgument : constructorArguments).push(value);
                        console.log("element separator");
                        break;
                    case "+":
                        evaluatorSet.setToAnd();
                        console.log("and operator");
                        break;
                    case "|":
                        evaluatorSet.setToOr();
                        console.log("or operator");
                        break;
                }
                pattern = pattern.substring(match.index + 1);
                console.log("pattern updated to " + pattern);
            }

            if (evaluatorSet.evaluator !== null) {
                console.log("");
                return evaluatorSet.evaluator;
            }

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

        private _balls<T>(evaluator: IEvaluator<T>, negate: boolean) {
        }
    }
}