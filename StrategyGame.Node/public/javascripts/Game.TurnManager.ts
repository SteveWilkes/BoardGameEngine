module AgileObjects.StrategyGame.Game {
    export class TurnManager {
        private _teams: Array<Team>;

        constructor(events: EventSet) {
            this._teams = new Array<Team>();

            events.pieceMoving.subscribe(originTile => {
                return true;
            });
        }

        public register(team: Team): void {
            this._teams.push(team);
        }
    }
} 