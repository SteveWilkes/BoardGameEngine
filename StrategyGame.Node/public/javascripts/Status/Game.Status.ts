module AgileObjects.StrategyGame.Game {

    export class Status {
        constructor(private _turnManager: TurnManager) {
        }

        public whosTurn(): string {
            if (this._turnManager.currentTeam.isLocal) {
                return "Your turn";
            }

            return this._turnManager.currentTeam.name + "'s turn";
        }
    }
}