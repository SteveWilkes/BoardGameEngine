module AgileObjects.BoardGameEngine.Players {

    export class Player implements T.ITeamOwner {
        constructor(public id: string, public isHuman: boolean, public isLocal: boolean = false) {
            this.teams = new Array<Teams.Team>();
        }

        public teams: Array<T.Team>;

        public getNextTeamId(): string {
            return this.id + "*" + this.teams.length.toString();
        }

        public add(team: T.Team): void {
            this.teams.push(team);
        }
    }
}