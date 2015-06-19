module AgileObjects.BoardGameEngine.Interactions {

    export class TurnCompletionManager {
        static complete(
            game: G.Game,
            nextTeamIndexSetter?: (nextTeamIndex: number) => void): boolean {

            var currentTeam = game.status.turnManager.currentTeam;
            var currentTeamIndex = game.teams.indexOf(currentTeam);
            var nextTeamIndex = currentTeamIndex + 1;
            if (nextTeamIndex === game.teams.length) {
                nextTeamIndex = 0;
            }

            if (typeof nextTeamIndexSetter === "function") {
                nextTeamIndexSetter(nextTeamIndex);
            }

            var nextTeam = game.teams[nextTeamIndex];

            return game.events.turnValidated.publish(nextTeam);
        }
    }
}