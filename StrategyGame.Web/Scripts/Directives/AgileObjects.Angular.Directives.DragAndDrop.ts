module AgileObjects.Angular.Directives {
    export function addDraggable(angularModule: ng.IModule): void {
        angularModule.directive("draggable", () => {
            return {
                scope: {
                    dragselect: "&", // parent
                    dragstart: "&", // parent
                    dragdeselect: "&", // parent
                    dragend: "&", // parent
                    subject: "=",
                    item: "="
                },
                link: ($scope: ng.IScope, element: ng.IAugmentedJQuery) => {
                    // this gives us the native JS object
                    var el = element[0];

                    el.draggable = true;

                    el.addEventListener(
                        "mousedown",
                        function () {
                            if (evaluateScope($scope, "dragselect")) {
                                this.classList.add("selected");
                            }
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "dragstart",
                        function (e: DragEvent) {
                            e.dataTransfer.setData("Text", this.id);
                            if (evaluateScope($scope, "dragstart")) {
                                e.dataTransfer.effectAllowed = "move";
                                this.classList.add("drag");
                            }
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "mouseup",
                        function () {
                            if (evaluateScope($scope, "dragdeselect")) {
                                this.classList.remove("selected");
                            }
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "dragend",
                        function () {
                            if (evaluateScope($scope, "dragend")) {
                                this.classList.remove("drag");
                            }
                            return false;
                        },
                        false);
                }
            };
        });
    }

    export function addDroppable(angularModule: ng.IModule): void {
        angularModule.directive("droppable", () => {
            return {
                scope: {
                    drop: "&", // parent
                    subject: "=",
                    item: "="
                },
                link: ($scope: ng.IScope, element: ng.IAugmentedJQuery) => {
                    // again we need the native object
                    var el = element[0];

                    el.addEventListener(
                        "dragover",
                        function (e: DragEvent) {
                            e.dataTransfer.dropEffect = "move";
                            // allows us to drop
                            if (e.preventDefault) { e.preventDefault(); }
                            this.classList.add("over");
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "dragenter",
                        function () {
                            this.classList.add("over");
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "dragleave",
                        function () {
                            this.classList.remove("over");
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "drop",
                        function (e: DragEvent) {
                            // Stops some browsers from redirecting.
                            if (e.stopPropagation) { e.stopPropagation(); }

                            this.classList.remove("over");

                            if (evaluateScope($scope, "drop")) {
                                var item = document.getElementById(e.dataTransfer.getData("Text"));
                                this.appendChild(item);
                            }

                            return false;
                        },
                        false);
                }
            }
        });
    }

    function evaluateScope($scope: ng.IScope, functionName: string): boolean {
        return $scope.$apply(($s: ng.IScope) => {
            var func: (item: Object) => boolean;
            if (typeof $s["subject"] === "object") {
                var subject = <AgileObjects.TypeScript.IStringDictionary<(item: Object) => boolean>>$s["subject"];
                var instanceMethodNameGetter = <() => string>$s[functionName];
                if (typeof instanceMethodNameGetter === "function") {
                    var instanceMethodName = instanceMethodNameGetter();
                    var instanceMethod = subject[instanceMethodName];
                    if (instanceMethod !== undefined) {
                        func = (item: Object) => instanceMethod.call(subject, item);
                    }
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
}