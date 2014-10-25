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
                            if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragselect")) {
                                this.classList.add("selected");
                            }
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "dragstart",
                        function (e: DragEvent) {
                            e.dataTransfer.setData("Text", this.id);
                            if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragstart")) {
                                e.dataTransfer.effectAllowed = "move";
                                this.classList.add("drag");
                            }
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "mouseup",
                        function () {
                            if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragdeselect")) {
                                this.classList.remove("selected");
                            }
                            return false;
                        },
                        false);

                    el.addEventListener(
                        "dragend",
                        function () {
                            if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "dragend")) {
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

                            if (AgileObjects.Angular.ScopeEvaluator.evaluate($scope, "drop")) {
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
}