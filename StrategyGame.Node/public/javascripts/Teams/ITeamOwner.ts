module AgileObjects.BoardGameEngine.Teams {
    
    export interface ITeamOwner extends TypeScript.IEntity<string> {
        isLocal: boolean;
        isHuman: boolean;
        getNextTeamId(): string;
        add(team: Team): void;
        takeTurn(team: Team): void;
    }
}
