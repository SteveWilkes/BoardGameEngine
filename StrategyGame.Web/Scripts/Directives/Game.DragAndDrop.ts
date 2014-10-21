module AgileObjects.StrategyGame.Game {
    game.directive("draggable", () => ($scope: ng.IScope, element: ng.IAugmentedJQuery) => {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            "dragstart",
            function (e: DragEvent) {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("Text", this.id);
                this.classList.add("drag");
                return false;
            },
            false);

        el.addEventListener(
            "dragend",
            function () {
                this.classList.remove("drag");
                return false;
            },
            false);
    });

    game.directive("droppable", () => {
        return {
            scope: {
                drop: "&" // parent
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

                        var item = document.getElementById(e.dataTransfer.getData("Text"));
                        this.appendChild(item);

                        // call the drop passed drop function
                        $scope.$apply("drop()");

                        return false;
                    },
                    false);
            }
        }
    });
}