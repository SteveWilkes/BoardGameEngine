var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var EventSet = (function () {
                function EventSet() {
                    this.pieceSelected = new AgileObjects.TypeScript.EventHub();
                    this.pieceMoving = new AgileObjects.TypeScript.EventHub();
                    this.pieceMoved = new AgileObjects.TypeScript.EventHub();
                    this.pieceDeselected = new AgileObjects.TypeScript.EventHub();
                }
                return EventSet;
            })();
            Game.EventSet = EventSet;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.EventSet.js.map
