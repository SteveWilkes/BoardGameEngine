module AgileObjects.Angular.Directives {
    interface IAnimateScope extends ng.IScope {
        eventname: string;
        classname: string;
    }

    export function addAddClassOnEvent(angularModule: ng.IModule): void {
        angularModule.directive("addClassOnEvent", ["$animate",
            (animationService: ng.IAnimateService) => {
                return {
                    scope: {
                        eventname: "=",
                        classname: "="
                    },
                    link: (scope: IAnimateScope, element: ng.IAugmentedJQuery) => {
                        element.on(scope.eventname, (event: Event) => {
                            var elem = angular.element(event.target);
                            if (elem.hasClass(scope.classname)) {
                                elem.removeClass(scope.classname);
                            }
                            animationService.addClass(elem, scope.classname);
                        });
                    }
                };
            }
        ]);
    }
}