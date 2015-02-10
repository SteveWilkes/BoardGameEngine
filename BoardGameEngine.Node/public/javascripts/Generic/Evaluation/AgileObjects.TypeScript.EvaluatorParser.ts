module AgileObjects.TypeScript.Evaluation {

    var _evaluatorFactories = {
        "pe": <T>(propertyName: string, allowedValues: Array<string>) => new PropertyEvaluator<T>(propertyName, allowedValues),
        "bme": <T>(methodName: string) => new BooleanMethodEvaluator<T>(methodName)
    };

    var _symbolMatcher = new RegExp("[\\{\\}\\[\\],]{1}");

    export class EvaluatorParser {
        static INSTANCE = new EvaluatorParser();

        public parse<T>(pattern: string): IEvaluator<T> {
            console.log("pattern = " + pattern);
            var evaluator: IEvaluator<T> = null;
            var match: RegExpExecArray;
            var evaluatorType = "";
            var constructorArguments = new Array<any>();
            var constructorArgument: any = null;
            while (match = _symbolMatcher.exec(pattern)) {
                console.log("match = " + match[0] + " (" + match.index + ")");
                switch (match[0]) {
                    case "{":
                        // start of constructor arguments
                        evaluatorType = pattern.substring(0, match.index);
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
                        evaluator = _evaluatorFactories[evaluatorType].apply(null, constructorArguments);
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