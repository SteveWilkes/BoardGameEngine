module AgileObjects.StrategyGame.Game {

    export class Team {
        constructor(private _startingFormations: Array<TeamStartingFormation>) {
        }

        public getStartingFormation(): TeamStartingFormation {
            return this._startingFormations[0];
        }
    }
} 