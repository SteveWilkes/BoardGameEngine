var AgileObjects;
(function (AgileObjects) {
    (function (Angular) {
        (function (Directives) {
            function addDraggable(angularModule) {
                angularModule.directive("draggable", function () {
                    return {
                        scope: {
                            dragselect: "&",
                            dragstart: "&",
                            dragdeselect: "&",
                            dragend: "&",
                            subject: "=",
                            item: "="
                        },
                        link: function ($scope, element) {
                            // this gives us the native JS object
                            var el = element[0];

                            el.draggable = true;

                            el.addEventListener("mousedown", function () {
                                if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragselect")) {
                                    this.classList.add("selected");
                                }
                                return false;
                            }, false);

                            el.addEventListener("dragstart", function (e) {
                                e.dataTransfer.setData("Text", this.id);
                                if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragstart")) {
                                    e.dataTransfer.effectAllowed = "move";
                                    this.classList.add("drag");
                                }
                                return false;
                            }, false);

                            el.addEventListener("mouseup", function () {
                                if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragdeselect")) {
                                    this.classList.remove("selected");
                                }
                                return false;
                            }, false);

                            el.addEventListener("dragend", function () {
                                if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragend")) {
                                    this.classList.remove("drag");
                                }
                                return false;
                            }, false);
                        }
                    };
                });
            }
            Directives.addDraggable = addDraggable;

            function addDroppable(angularModule) {
                angularModule.directive("droppable", function () {
                    return {
                        scope: {
                            drop: "&",
                            subject: "=",
                            item: "="
                        },
                        link: function ($scope, element) {
                            // again we need the native object
                            var el = element[0];

                            el.addEventListener("dragover", function (e) {
                                e.dataTransfer.dropEffect = "move";

                                // allows us to drop
                                if (e.preventDefault) {
                                    e.preventDefault();
                                }
                                this.classList.add("over");
                                return false;
                            }, false);

                            el.addEventListener("dragenter", function () {
                                this.classList.add("over");
                                return false;
                            }, false);

                            el.addEventListener("dragleave", function () {
                                this.classList.remove("over");
                                return false;
                            }, false);

                            el.addEventListener("drop", function (e) {
                                // Stops some browsers from redirecting.
                                if (e.stopPropagation) {
                                    e.stopPropagation();
                                }

                                this.classList.remove("over");

                                if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "drop")) {
                                    var item = document.getElementById(e.dataTransfer.getData("Text"));
                                    this.appendChild(item);
                                }

                                return false;
                            }, false);
                        }
                    };
                });
            }
            Directives.addDroppable = addDroppable;
        })(Angular.Directives || (Angular.Directives = {}));
        var Directives = Angular.Directives;
    })(AgileObjects.Angular || (AgileObjects.Angular = {}));
    var Angular = AgileObjects.Angular;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Directives/AgileObjects.Angular.Directives.DragAndDrop.js.map
