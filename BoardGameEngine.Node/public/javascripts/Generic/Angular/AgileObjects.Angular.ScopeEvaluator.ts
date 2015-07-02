module AgileObjects.Angular.ScopeEvaluator {

    export function evaluate($scope: ng.IScope, functionName: string): boolean {
        return $scope.$apply(($s: ng.IScope) => {
            if ($s["active"] === false) { return false; }

            var func: (item: Object) => boolean;
            if (typeof $s["subject"] === "object") {
                var subject = <Ts.IStringDictionary<(item: Object) => boolean>>$s["subject"];
                var instanceMethodNameGetter = <() => string>$s[functionName];
                if (typeof instanceMethodNameGetter === "function") {
                    var instanceMethodName = instanceMethodNameGetter();
                    var instanceMethod = subject[instanceMethodName];
                    if (typeof instanceMethod === "function") {
                        func = (item: Object) => instanceMethod.call(subject, item);
                    }
                    else if (instanceMethod instanceof AgileObjects.TypeScript.EventHub) {
                        var eventHub = <Ts.EventHub<Object>><Object>instanceMethod;
                        func = (item: Object) => eventHub.publish(item);
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
} 