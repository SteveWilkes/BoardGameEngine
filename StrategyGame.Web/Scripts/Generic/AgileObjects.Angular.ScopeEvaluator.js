var AgileObjects;
(function (AgileObjects) {
    (function (Angular) {
        (function (ScopeEvaluator) {
            function evaluate($scope, functionName) {
                return $scope.$apply(function ($s) {
                    var func;
                    if (typeof $s["subject"] === "object") {
                        var subject = $s["subject"];
                        var instanceMethodNameGetter = $s[functionName];
                        if (typeof instanceMethodNameGetter === "function") {
                            var instanceMethodName = instanceMethodNameGetter();
                            var instanceMethod = subject[instanceMethodName];
                            if (instanceMethod !== undefined) {
                                func = function (item) {
                                    return instanceMethod.call(subject, item);
                                };
                            }
                        }
                    } else {
                        var funcGetter = $s[functionName];
                        if (typeof funcGetter === "function") {
                            func = funcGetter();
                        }
                    }

                    if (typeof func === "function") {
                        var result = func($s["item"]);
                        return result !== false;
                    }

                    return true;
                });
            }
            ScopeEvaluator.evaluate = evaluate;
        })(Angular.ScopeEvaluator || (Angular.ScopeEvaluator = {}));
        var ScopeEvaluator = Angular.ScopeEvaluator;
    })(AgileObjects.Angular || (AgileObjects.Angular = {}));
    var Angular = AgileObjects.Angular;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Generic/AgileObjects.Angular.ScopeEvaluator.js.map
