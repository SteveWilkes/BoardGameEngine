module AgileObjects.StrategyGame.Game {
    game.directive("removeClass", () => {
        return {
            restrict: "A",
            link: (scope: any, element: any, attrs: ng.IAttributes) => {
                element.removeClass(attrs["removeClass"]);
            }
        };
    });
}