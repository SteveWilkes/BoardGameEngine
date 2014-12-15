module AgileObjects.StrategyGame.Game.Teams {
    
    export interface ITeamOwner {
        isLocal: boolean;
        add(team: Team): void;
        takeTurn(): void;
    }
}
