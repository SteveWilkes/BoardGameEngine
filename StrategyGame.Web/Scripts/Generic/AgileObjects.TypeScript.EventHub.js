var AgileObjects;
(function (AgileObjects) {
    (function (TypeScript) {
        var EventHub = (function () {
            function EventHub() {
                this._subscribers = new Array();
            }
            EventHub.prototype.subscribe = function (callback) {
                this._subscribers.push(callback);
                return this;
            };

            EventHub.prototype.publish = function (eventData) {
                for (var i = 0; i < this._subscribers.length; i++) {
                    if (this._subscribers[i](eventData) === false) {
                        return false;
                    }
                }
                return true;
            };
            return EventHub;
        })();
        TypeScript.EventHub = EventHub;
    })(AgileObjects.TypeScript || (AgileObjects.TypeScript = {}));
    var TypeScript = AgileObjects.TypeScript;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Generic/AgileObjects.TypeScript.EventHub.js.map
