module AgileObjects.StrategyGame.Game.Teams {
    
    export interface ITeamOwner extends TypeScript.IEntity<string> {
        isLocal: boolean;
        getNextTeamId(): string;
        add(team: Team): void;
        takeTurn(team: Team): void;
    }
}
