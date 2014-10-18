module AgileObjects.StrategyGame.Game.Startup {

    var tileNumber = 14;

    class BoardLayoutManager {
        public setupBoard(): void {
            $(window).resize(() => this._layoutTiles());
            this._layoutTiles();
            $("#board").removeClass("hidden");
        }

        private _layoutTiles(attemptNumber: number = 1): void {
            var currentHeight = $(window).height();
            var tileSize = Math.floor(currentHeight / tileNumber);
            $("div.board-tile").width(tileSize).height(tileSize);
        }
    }

    var layoutManager = new BoardLayoutManager();

    $(() => layoutManager.setupBoard());
}