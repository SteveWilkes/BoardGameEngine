module AgileObjects.Angular.Directives {
    export function addScrollToBottom(angularModule: ng.IModule): void {
        angularModule.directive("scrolltobottom", () => {
            return {
                restrict: "A",
                link: (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
                    setInterval(() => {
                        element.scrollTop(element[0].scrollHeight);
                    }, 100);
                }
            };
        });
    }
}