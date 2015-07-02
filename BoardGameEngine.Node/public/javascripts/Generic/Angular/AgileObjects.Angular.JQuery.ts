declare module ng {
    interface IAugmentedJQuery {
        raiseEvent(eventName: string): any;
    }
}

module AgileObjects.Angular.JQuery {
    angular.element.prototype["raiseEvent"] = function (eventName: string) {
        var element = this[0];
        if (typeof document.createEvent === "function") {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(eventName, false, true);
            element.dispatchEvent(evt);
        } else {
            element.fireEvent("on" + eventName);
        }
    };
}