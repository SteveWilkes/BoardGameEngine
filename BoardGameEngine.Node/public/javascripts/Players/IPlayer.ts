module AgileObjects.BoardGameEngine.Players {
    import Teams = BoardGameEngine.Teams;

    export interface IPlayer extends Teams.ITeamOwner {
        teams: Array<Teams.Team>;
    }
}