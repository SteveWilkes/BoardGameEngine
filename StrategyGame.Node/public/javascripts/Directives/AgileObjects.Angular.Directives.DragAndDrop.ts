module AgileObjects.Angular.Directives {
    var draggable = {
        scope: {
            dragselect: "&", // parent
            dragstart: "&", // parent
            dragdeselect: "&", // parent
            dragend: "&", // parent
            subject: "=",
            item: "="
        },
        link($scope: ng.IScope, element: ng.IAugmentedJQuery) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener(
                "mousedown",
                function (e: MouseEvent) {
                    if (Angular.ScopeEvaluator.evaluate($scope, "dragselect")) {
                        this.classList.add("selected");
                    } else if (e.preventDefault) {
                        e.preventDefault();
                    }
                    return false;
                },
                false);

            el.addEventListener(
                "dragstart",
                function (e: DragEvent) {
                    e.dataTransfer.setData("Text", this.id);
                    if (Angular.ScopeEvaluator.evaluate($scope, "dragstart")) {
                        e.dataTransfer.effectAllowed = "move";
                        this.classList.add("drag");
                    } else if (e.preventDefault) {
                        e.preventDefault();
                        if (typeof document.createEvent === "function") {
                            var evt = document.createEvent("HTMLEvents");
                            evt.initEvent("dragend", false, true);
                            this.dispatchEvent(evt);
                        } else {
                            this.fireEvent("ondragend");
                        }

                    }
                    return false;
                },
                false);

            el.addEventListener(
                "mouseup",
                function () {
                    if (Angular.ScopeEvaluator.evaluate($scope, "dragdeselect")) {
                        this.classList.remove("selected");
                    }
                    return false;
                },
                false);

            el.addEventListener(
                "dragend",
                function () {
                    if (Angular.ScopeEvaluator.evaluate($scope, "dragend")) {
                        this.classList.remove("drag");
                    }
                    return false;
                },
                false);
        }
    };

    var droppable = {
        scope: {
            drop: "&", // parent
            subject: "=",
            item: "="
        },
        link($scope: ng.IScope, element: ng.IAugmentedJQuery) {
            // again we need the native object
            var el = element[0];

            el.addEventListener(
                "dragover",
                function (e: DragEvent) {
                    e.dataTransfer.dropEffect = "move";
                    // allows us to drop
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
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

                    Angular.ScopeEvaluator.evaluate($scope, "drop");

                    return false;
                },
                false);
        }
    };

    var draggableDroppableScope = {};
    var propertyName: string;

    for (propertyName in draggable.scope) {
        draggableDroppableScope[propertyName] = draggable.scope[propertyName];
    }

    for (propertyName in droppable.scope) {
        draggableDroppableScope[propertyName] = droppable.scope[propertyName];
    }

    var draggableDroppable = {
        scope: draggableDroppableScope,
        link($scope: ng.IScope, element: ng.IAugmentedJQuery) {
            draggable.link($scope, element);
            droppable.link($scope, element);
        }
    };

    export function addDraggable(angularModule: ng.IModule): void {
        angularModule.directive("draggable", () => { return draggable; });
    }

    export function addDroppable(angularModule: ng.IModule): void {
        angularModule.directive("droppable", () => { return droppable; });
    }

    export function addDraggableDroppable(angularModule: ng.IModule): void {
        angularModule.directive("draggabledroppable", () => { return draggableDroppable; });
    }
}