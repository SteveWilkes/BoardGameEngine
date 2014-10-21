module AgileObjects.StrategyGame.Game {
    game.directive("draggable", () => {
        return {
            scope: {
                dragstart: "&", // parent
                dragend: "&", // parent
                item: "="
            },
            link: ($scope: ng.IScope, element: ng.IAugmentedJQuery) => {
                // this gives us the native JS object
                var el = element[0];

                el.draggable = true;

                el.addEventListener(
                    "dragstart",
                    function (e: DragEvent) {
                        console.log("Drag started");
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("Text", this.id);
                        this.classList.add("drag");
                        $scope.$apply("dragstart()");
                        return false;
                    },
                    false);

                el.addEventListener(
                    "dragend",
                    function () {
                        console.log("Drag ended");
                        this.classList.remove("drag");
                        $scope.$apply("dragend()");
                        return false;
                    },
                    false);
            }
        };
    });

    game.directive("droppable", () => {
        return {
            scope: {
                drop: "&", // parent
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
                        console.log("Drop");
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) { e.stopPropagation(); }

                        this.classList.remove("over");

                        var item = document.getElementById(e.dataTransfer.getData("Text"));
                        this.appendChild(item);

                        $scope.$apply("drop()");

                        return false;
                    },
                    false);
            }
        }
    });
}