var AgileObjects;
(function (AgileObjects) {
    (function (Angular) {
        (function (Directives) {
            function addDraggable(angularModule) {
                angularModule.directive("draggable", function () {
                    return {
                        scope: {
                            dragstart: "&",
                            dragend: "&",
                            subject: "=",
                            item: "="
                        },
                        link: function ($scope, element) {
                            // this gives us the native JS object
                            var el = element[0];

                            el.draggable = true;

                            el.addEventListener("dragstart", function (e) {
                                console.log("Drag started");
                                if (evaluateScope($scope, "dragstart")) {
                                    e.dataTransfer.effectAllowed = "move";
                                    e.dataTransfer.setData("Text", this.id);
                                    this.classList.add("drag");
                                }
                                return false;
                            }, false);

                            el.addEventListener("dragend", function () {
                                console.log("Drag ended");
                                if (evaluateScope($scope, "dragend")) {
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
                                console.log("Drop");

                                // Stops some browsers from redirecting.
                                if (e.stopPropagation) {
                                    e.stopPropagation();
                                }

                                this.classList.remove("over");

                                if (evaluateScope($scope, "drop")) {
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

            function evaluateScope($scope, functionName) {
                return $scope.$apply(function ($s) {
                    var func;
                    if (typeof $s["subject"] === "object") {
                        var subject = $s["subject"];
                        var instanceMethodNameGetter = $s[functionName];
                        if (typeof instanceMethodNameGetter === "function") {
                            var instanceMethodName = instanceMethodNameGetter();
                            func = function (item) {
                                return subject[instanceMethodName].call(subject, item);
                            };
                        }
                    } else {
                        var funcGetter = $s[functionName];
                        if (typeof funcGetter === "function") {
                            func = funcGetter();
                        }
                    }

                    if (typeof func === "function") {
                        var result = func($s["item"]);
                        return result !== false;
                    }

                    return true;
                });
            }
        })(Angular.Directives || (Angular.Directives = {}));
        var Directives = Angular.Directives;
    })(AgileObjects.Angular || (AgileObjects.Angular = {}));
    var Angular = AgileObjects.Angular;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Directives/AgileObjects.Angular.Directives.DragAndDrop.js.map
