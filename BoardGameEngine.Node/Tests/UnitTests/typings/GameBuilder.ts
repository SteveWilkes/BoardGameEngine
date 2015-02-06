module AgileObjects.BoardGameEngine.Tests.UnitTests {

    export interface IPieceConfigurator {
        withUdlrAttachmentTo(pieceDefinitionIds: Array<string>, distance?: number): IPieceConfigurator;
        withUdlrMovementBy(distance: number): IPieceConfigurator;
        withUdlrInfiniteMovement(): IPieceConfigurator;
        withUdlrAttackOver(distance: number): IPieceConfigurator;
        wherePathStepsMustBeUnoccupied(): IPieceConfigurator;
        withPathStepsValidatedBy(...validators: Array<new () => Pieces.IPieceLocationValidator>): IPieceConfigurator;
        whereDestinationsMustBeUnoccupied(): IPieceConfigurator;
        withDestinationsValidatedBy(...validators: Array<new () => Pieces.IPieceLocationValidator>): IPieceConfigurator;
        and(): IPieceConfigurator;
    }

    export interface ITeamConfigurator {
        withAPieceAt(coordinateSignatures: Array<string>, config: (configurator: IPieceConfigurator) => void): ITeamConfigurator;
    }

    export interface IGameConfigurator {
        withAttackThenMoveTurnInteractions(): IGameConfigurator;
        withTurnInteractions(turnInteractions: Array<P.InteractionType>): IGameConfigurator;
        withA3x3NorthSouthBoard(): IGameConfigurator;
        withASquareBoardOfSize(size: number): IGameConfigurator;
        withNorthSouthBoardPositions(): IGameConfigurator;
        withHumanLocalAndRemotePlayers(): IGameConfigurator;
        withATeamForPlayer(playerNumber: number, config: (configurator: ITeamConfigurator) => void): IGameConfigurator;
    }

    export interface IGameBuilderService {
        createGame(config: (configurator: IGameConfigurator) => void): G.Game;
        createDefaultGame(): G.Game;
        startGame(config: (configurator: IGameConfigurator) => void): G.Game;
        startDefaultGame(): G.Game;
    }
}