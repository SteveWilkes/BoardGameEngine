module AgileObjects.BoardGameEngine.Tests.UnitTests {

    export interface IPieceConfigurator {
        withUdlrMovementBy(distance: number): IPieceConfigurator;
        withPathStepsValidatedBy(...validators: Array<new () => Pieces.IPieceLocationValidator>): IPieceConfigurator;
        withDestinationsValidatedBy(...validators: Array<new () => Pieces.IPieceLocationValidator>): IPieceConfigurator;
        and(): IPieceConfigurator;
    }

    export interface ITeamConfigurator {
        withAPieceAt(coordinateSignatures: Array<string>, config: (configurator: IPieceConfigurator) => void): ITeamConfigurator;
    }

    export interface IGameConfigurator {
        withA3x3NorthSouthBoard(): IGameConfigurator;
        withHumanLocalAndRemotePlayers(): IGameConfigurator;
        withATeamForPlayer(playerNumber: number, config: (configurator: ITeamConfigurator) => void): IGameConfigurator;
    }

    export interface IGameBuilderService {
        createGame(config: (configurator: IGameConfigurator) => void): Games.Game;
        createDefaultGame(): Games.Game;
    }
}