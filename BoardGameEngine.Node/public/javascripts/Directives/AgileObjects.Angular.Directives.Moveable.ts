module AgileObjects.Angular.Directives {

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
                            () => {
                                el.style.marginTop = "-10px";
                                document.onmousemove = (e: MouseEvent) => {
                                    var mouseX = e.pageX || window.event.clientX;
                                    var mouseY = e.pageY || window.event.clientY;
                                    el.style.left = mouseX + "px";
                                    el.style.top = mouseY + "px";
                                };
                                return false;
                            },
                            false);

                        el.addEventListener(
                            "mouseup",
                            () => {
                                document.onmousemove = undefined;
                                return false;
                            },
                            false);
                    }
                };
            }
        ]);
    }
}