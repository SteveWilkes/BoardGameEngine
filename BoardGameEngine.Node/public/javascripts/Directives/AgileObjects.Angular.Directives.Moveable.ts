module AgileObjects.Angular.Directives {

    interface IMoveableHtmlElement extends HTMLElement {
        moveStartOffsetX: number;
        moveStartOffsetY: number;
    }

    function getAbsolutelyPositionedContainer(element: HTMLElement): IMoveableHtmlElement {
        while (element) {
            var style = element.currentStyle || window.getComputedStyle(element, null);
            if (style.position === "absolute") {
                return <IMoveableHtmlElement>element;
            }
            element = element.parentElement;
        }
    }

    function positionToMouse(element: IMoveableHtmlElement, e: MouseEvent) {
        var mouseX = e.clientX || window.event.clientX;
        var mouseY = e.clientY || window.event.clientY;
        if (!element.hasOwnProperty("moveStartOffsetX")) {
            var offsetX = e.offsetX || e.layerX;
            var offsetY = e.offsetY || e.layerY;
            element.moveStartOffsetX = ((offsetX > 0) && (offsetX < mouseX)) ? Math.round(offsetX) : 20;
            element.moveStartOffsetY = ((offsetY > 0) && (offsetY < mouseY)) ? Math.round(offsetY) : 20;
        }
        element.style.left = (mouseX - element.moveStartOffsetX) + "px";
        element.style.top = (mouseY - element.moveStartOffsetY) + "px";
    }

    export function addMoveable(angularModule: ng.IModule): void {
        angularModule.directive("moveable", ["$document",
            ($document: ng.IDocumentService) => {
                return {
                    link: (scope: ng.IScope, $element: ng.IAugmentedJQuery) => {
                        // this gives us the native JS object
                        var document = $document[0];
                        var element = getAbsolutelyPositionedContainer($element[0]);

                        element.addEventListener(
                            "mousedown",
                            function (mouseDown: MouseEvent) {
                                this.style.marginTop = this.style.marginLeft = "0";
                                positionToMouse(this, mouseDown);
                                document.onmousemove = (mouseMove: MouseEvent) => {
                                    positionToMouse(element, mouseMove);
                                    return false;
                                };
                                return false;
                            },
                            false);

                        element.addEventListener(
                            "mouseup",
                            function () {
                                document.onmousemove = undefined;
                                delete this.moveStartOffsetX;
                                delete this.moveStartOffsetY;
                                return false;
                            },
                            false);
                    }
                };
            }
        ]);
    }
}