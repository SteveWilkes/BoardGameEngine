module AgileObjects.StrategyGame.Game.Status {

    export class StatusData {
        constructor(private _turnManager: TurnManager) {
        }

        public whosTurn(): string {
            if (this._turnManager.currentTeam.player.isLocal) {
                return "Your turn!";
            }

            return this._turnManager.currentTeam.name + "'s turn";
        }
    }
}