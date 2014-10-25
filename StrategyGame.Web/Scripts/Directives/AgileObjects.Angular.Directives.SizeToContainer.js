var AgileObjects;
(function (AgileObjects) {
    (function (Angular) {
        (function (Directives) {
            function addSizeToContainer(angularModule) {
                angularModule.directive("sizeToContainer", [
                    "$window",
                    function ($window) {
                        return {
                            scope: {
                                resize: "&",
                                subject: "=",
                                item: "="
                            },
                            link: function ($scope) {
                                return angular.element($window).bind("resize", function () {
                                    AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "resize");
                                });
                            }
                        };
                    }
                ]);
            }
            Directives.addSizeToContainer = addSizeToContainer;
        })(Angular.Directives || (Angular.Directives = {}));
        var Directives = Angular.Directives;
    })(AgileObjects.Angular || (AgileObjects.Angular = {}));
    var Angular = AgileObjects.Angular;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Directives/AgileObjects.Angular.Directives.SizeToContainer.js.map
