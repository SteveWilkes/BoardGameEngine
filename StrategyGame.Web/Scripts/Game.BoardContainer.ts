module AgileObjects.StrategyGame.Game {

    export interface IBoardContainer {
        getSize(): number;
    }

    class BoardContainer {
        // ReSharper disable InconsistentNaming
        constructor(private _$window: ng.IWindowService) {
            // ReSharper restore InconsistentNaming
        }

        public getSize(): number {
            return Math.min(this._$window.innerWidth, this._$window.innerHeight);
        }
    }

    game.service("$boardContainer", ["$window", BoardContainer]);
} 