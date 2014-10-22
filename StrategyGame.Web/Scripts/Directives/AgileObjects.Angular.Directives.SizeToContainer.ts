module AgileObjects.Angular.Directives {
    export function addSizeToContainer(angularModule: ng.IModule): void {
        angularModule.directive("sizeToContainer", ["$window",
            ($window: ng.IWindowService) => {
                return ($scope: ng.IScope) => {
                    return angular.element($window).bind("resize", () => {
                        $scope.$apply("resize()");
                    });
                };
            }
        ]);
    }
}