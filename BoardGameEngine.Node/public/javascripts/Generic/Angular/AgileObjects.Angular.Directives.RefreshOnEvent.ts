module AgileObjects.Angular.Directives {
    interface IRefreshScope extends ng.IScope {
        eventname: string;
    }

    export function addRefreshOnEvent(angularModule: ng.IModule): void {
        angularModule.directive("refreshOnEvent",() => {
            return {
                scope: {
                    eventname: "="
                },
                link: (scope: IRefreshScope, element: ng.IAugmentedJQuery) => {
                    element.on(scope.eventname, scope.$apply);
                }
            };
        });
    }
}