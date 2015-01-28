module AgileObjects.Angular.Directives {
    export function addSizeToContainer(angularModule: ng.IModule): void {
        angularModule.directive("sizeToContainer", ["$window",
            ($window: ng.IWindowService) => {
                return {
                    scope: {
                        resize: "&",
                        subject: "=",
                        item: "="
                    },
                    link: ($scope: ng.IScope) => {
                        return angular.element($window).bind("resize", () => {
                            AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "resize");
                        });
                    }
                };
            }
        ]);
    }
}