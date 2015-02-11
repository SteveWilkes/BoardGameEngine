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
            var evaluator: IEvaluator<T> = null, tempEvaluator: IEvaluator<T> = null;
            var evaluators: Array<IEvaluator<T>> = null;
            var match: RegExpExecArray, groupMatch: RegExpExecArray;
            var evaluatorType = "";
            var constructorArguments: Array<any> = null;
            var constructorArgument: any = null;
            var negate = false;
            while (match = _symbolMatcher.exec(pattern)) {
                console.log("match = " + match[0] + " (" + match.index + ")");
                switch (match[0]) {
                    case "(":
                        console.log("Start of group");
                        var numberOfOpenSubGroups = 0, groupEndIndex = 0;
                        while (groupMatch = _groupMatcher.exec(pattern.substring(1))) {
                            if (groupMatch[0] === "(") {
                                ++numberOfOpenSubGroups;
                            } else {
                                if (numberOfOpenSubGroups === 0) {
                                    groupEndIndex = groupMatch.index;
                                    match = groupMatch;
                                    break;
                                } else {
                                    --numberOfOpenSubGroups;
                                }
                            }
                        }
                        var groupPattern = pattern.substring(1, groupEndIndex + 1);
                        tempEvaluator = this.parse<T>(groupPattern);
                        if (negate) {
                            tempEvaluator = new NegationEvaluator(tempEvaluator);
                            negate = false;
                        }
                        if (evaluators instanceof Array) {
                            evaluators.push(tempEvaluator);
                        } else {
                            evaluator = tempEvaluator;
                        }
                        break;
                    case ")":
                        console.log("End of group");
                        break;
                    case "!":
                        negate = true;
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
                        tempEvaluator = _evaluatorFactories[evaluatorType].apply(null, constructorArguments);
                        if (negate) {
                            tempEvaluator = new NegationEvaluator(tempEvaluator);
                            negate = false;
                        }
                        if (evaluators instanceof Array) {
                            evaluators.push(tempEvaluator);
                        } else {
                            evaluator = tempEvaluator;
                        }
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
                        constructorArguments.push(constructorArgument.slice(0));
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
                        evaluators = new Array<IEvaluator<T>>(evaluator);
                        evaluator = new CompositeAndEvaluator(evaluators);
                        console.log("and operator");
                        break;
                    case "|":
                        evaluators = new Array<IEvaluator<T>>(evaluator);
                        evaluator = new CompositeOrEvaluator(evaluators);
                        console.log("or operator");
                        break;
                }
                pattern = pattern.substring(match.index + 1);
                console.log("pattern updated to " + pattern);
            }

            if (evaluator !== null) {
                console.log("");
                return evaluator;
            }

            throw new Error("Unable to parse Evaluator");
        }

        private _parseEvaluator<T>(segment: string): IEvaluator<T> {
            var evaluatorData = segment.substring(0, segment.length - 1).split("{");
            var evaluatorType = evaluatorData[0];
            var constructorData = evaluatorData[1].split(",");
            var propertyName = constructorData[0];
            var allowedValues = constructorData.slice(1);

            return _evaluatorFactories[evaluatorType].apply(null, [propertyName, allowedValues]);
        }
    }
}