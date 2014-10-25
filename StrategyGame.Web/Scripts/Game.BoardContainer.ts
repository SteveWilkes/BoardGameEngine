module AgileObjects.StrategyGame.Game {

    export class BoardContainer {
        constructor(private _$window: ng.IWindowService) {
        }

        public getSize(): number {
            return Math.min(this._$window.innerWidth, this._$window.innerHeight);
        }
    }
} 