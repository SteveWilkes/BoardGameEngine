module AgileObjects.BoardGameEngine.Teams {

    export class TeamData {
        constructor(team?: Team) {
            this.playerId = team.ownerId();
        }

        public playerId: string;
    }
}