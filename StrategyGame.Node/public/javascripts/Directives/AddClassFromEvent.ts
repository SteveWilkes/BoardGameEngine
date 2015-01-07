module AgileObjects.StrategyGame {
    export function addAddClassFromEvent(angularModule: ng.IModule): void {
        angularModule.directive("addClassFromEvent", ["$animate",
            animationService => (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
                element.on("attack", (event: Event) => {
                    var elem = angular.element(event.target);
                    var className = "board-tile-attack-animation";
                    if (elem.hasClass(className)) { elem.removeClass(className); }
                    animationService.addClass(elem, className);
                });
            }]);
    }
}