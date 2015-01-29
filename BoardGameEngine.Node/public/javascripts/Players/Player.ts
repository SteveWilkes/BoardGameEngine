module AgileObjects.BoardGameEngine.Players {
    import Teams = BoardGameEngine.Teams;

    export class Player implements IPlayer {
        constructor(public id: string, public isHuman: boolean, public isLocal: boolean = false) {
            this.teams = new Array<Teams.Team>();
        }

        public teams: Array<Teams.Team>;

        public getNextTeamId(): string {
            return this.id + "*" + this.teams.length.toString();
        }

        public add(team: Teams.Team): void {
            this.teams.push(team);
        }

        public takeTurn(team: Teams.Team): void { }
    }
}