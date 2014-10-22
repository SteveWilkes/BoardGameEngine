var AgileObjects;
(function (AgileObjects) {
    (function (Angular) {
        (function (Directives) {
            function addRemoveClass(angularModule) {
                angularModule.directive("removeClass", function () {
                    return {
                        restrict: "A",
                        link: function (scope, element, attrs) {
                            element.removeClass(attrs["removeClass"]);
                        }
                    };
                });
            }
            Directives.addRemoveClass = addRemoveClass;
        })(Angular.Directives || (Angular.Directives = {}));
        var Directives = Angular.Directives;
    })(AgileObjects.Angular || (AgileObjects.Angular = {}));
    var Angular = AgileObjects.Angular;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Directives/AgileObjects.Angular.Directives.RemoveClass.js.map
