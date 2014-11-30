module AgileObjects.StrategyGame.Game {
    export class TurnManager {
        private _teams: Array<Team>;

        constructor(events: EventSet) {
            this._teams = new Array<Team>();

            events.teamLoaded.subscribe(team => {
                this._teams.push(team);
                return true;
            });

            events.pieceMoving.subscribe(originTile => {
                return true;
            });
        }
    }
} 