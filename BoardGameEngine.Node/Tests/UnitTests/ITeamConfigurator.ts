module AgileObjects.BoardGameEngine.Games {

    export interface ITeamConfigurator {
        getGameOwner(): Pl.Player;
        setupTeams(game: Game): void;
    }
}