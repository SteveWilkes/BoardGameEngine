module AgileObjects.Angular.Directives {

    function positionToMouse(e: MouseEvent) {
        var mouseX = e.pageX || window.event.clientX;
        var mouseY = e.pageY || window.event.clientY;
        if (!this.hasOwnProperty("moveStartOffsetX")) {
            this["moveStartOffsetX"] = Math.round(e.offsetX || 0);
            this["moveStartOffsetY"] = Math.round(e.offsetY || 0);
        }
        this.style.left = (mouseX - this.moveStartOffsetX) + "px";
        this.style.top = (mouseY - this.moveStartOffsetY) + "px";
    }

    export function addMoveable(angularModule: ng.IModule): void {
        angularModule.directive("moveable", ["$document",
            ($document: ng.IDocumentService) => {
                return {
                    link: (scope: ng.IScope, $element: ng.IAugmentedJQuery) => {
                        // this gives us the native JS object
                        var document = $document[0];
                        var el = $element[0];

                        el.addEventListener(
                            "mousedown",
                            (mouseDown: MouseEvent) => {
                                el.style.marginTop = el.style.marginLeft = "0";
                                positionToMouse.call(el, mouseDown);
                                document.onmousemove = (mouseMove: MouseEvent) => {
                                    positionToMouse.call(el, mouseMove);
                                    return false;
                                };
                                return false;
                            },
                            false);

                        el.addEventListener(
                            "mouseup",
                            () => {
                                document.onmousemove = undefined;
                                delete el["moveStartOffsetX"];
                                delete el["moveStartOffsetY"];
                                return false;
                            },
                            false);
                    }
                };
            }
        ]);
    }
}