module AgileObjects.Angular.Directives {
    export function addRemoveClass(angularModule: ng.IModule): void {
        angularModule.directive("removeClass", () => {
            return {
                restrict: "A",
                link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                    element.removeClass(attrs["removeClass"]);
                }
            };
        });
    }
}