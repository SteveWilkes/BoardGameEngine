module AgileObjects.StrategyGame.Game.Players {
    import Teams = StrategyGame.Game.Teams;

    export class PlayerBase implements IPlayer {
        constructor(public id: string, public isLocal: boolean) {
            this.teams = new Array<Teams.Team>();
        }

        public teams: Array<Teams.Team>;

        public getNextTeamId(): string {
            return this.teams.length.toString();
        }

        public add(team: Teams.Team): void {
            team.owner = this;
            this.teams.push(team);
        }

        public takeTurn(team: Teams.Team): void { }
    }
}