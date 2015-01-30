module AgileObjects.BoardGameEngine.Tests.UnitTests {

    export interface PieceConfigurator {
        withUdlrMovementBy(distance: number): PieceConfigurator;
    }

    export interface TeamConfigurator {
        withAPieceAt(coordinateSignatures: Array<string>, config: (configurator: PieceConfigurator) => void): TeamConfigurator;
    }

    export interface GameConfigurator {
        withA3x3NorthSouthBoard(): GameConfigurator;
        withHumanLocalAndRemotePlayers(): GameConfigurator;
        withATeamForPlayer(playerNumber: number, config: (configurator: TeamConfigurator) => void): GameConfigurator;
    }

    export interface GameBuilderService {
        createGame(config: (configurator: GameConfigurator) => void): Games.Game;
        createDefaultGame(): Games.Game;
    }
}