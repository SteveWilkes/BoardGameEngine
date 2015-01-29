module Typings {
    import Bge = AgileObjects.BoardGameEngine;
    import B = Bge.Boards;
    import G = Bge.Games;
    import P = Bge.Pieces;
    import Ts = AgileObjects.TypeScript;
    import Svc = AgileObjects.Angular.Services;

    interface TypeScript {
        Coordinates: new (row: number, column: number, signature?: string) => Ts.Coordinates;
        CoordinateTranslator: new (directionFunctionName: string, distance: number) => Ts.CoordinateTranslator;
        CoordinatesRegistry: typeof Ts.CoordinatesRegistry;
        Dictionary: new <TKey, TValue>() => Ts.Dictionary<TKey, TValue>;
        RandomStringGenerator: new () => Ts.RandomStringGenerator;
    }

    interface Boards {
        Board: new (type: B.BoardType, events: G.GameEventSet) => B.Board;
        BoardOrientationTranslator: new () => B.BoardOrientationTranslator;
        BoardPosition: new (name: string, coordinateTranslator: (coordinates: Ts.Coordinates, gridSize: number) => Ts.Coordinates, isFocusPosition?: boolean) => B.BoardPosition
        BoardRowConfig: new (tileConfigs: Array<boolean>) => B.BoardRowConfig;
        BoardType: new (id: string, name: string, availablePositions: Array<B.BoardPosition>, rowConfigs: Array<B.BoardRowConfig>, orientationTranslator: B.BoardOrientationTranslator) => B.BoardType;
        GetBoardTypeQuery: new () => B.GetBoardTypeQuery;
    }

    interface Games {
        GameEventSet: new () => G.GameEventSet;
        GameFactory: new (getGameTypeQuery: Ts.IGetQuery<G.GameType>) => G.GameFactory;
        Game: new (id: string, type: G.GameType, board: B.Board, events: G.GameEventSet) => G.Game;
        GameService: new (idGenerator: Svc.IIdGenerator, gameFactory: G.GameFactory, teamFactory: Bge.Teams.ITeamFactory) => G.GameService;
        GameType: new (id: string, boardType: B.BoardType, interactionRegulator: P.IPieceInteractionRegulator) => G.GameType;
        GetGameTypeQuery: new (getBoardTypeQuery: Ts.IGetQuery<B.BoardType>) => G.GetGameTypeQuery;
        ServerGameCoordinator: new (gameFactory: G.GameFactory, teamFactory: Bge.Teams.ITeamFactory) => G.ServerGameCoordinator;
    }

    interface Pieces {
        MovePieceToDestinationInteraction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.MovePieceToDestinationInteraction;
        Piece: new (id: string, definitionId: string, imageSource: string, interactionProfile: P.PieceInteractionProfile) => P.Piece;
        PieceFactory: new () => P.PieceFactory;
        PieceInteractionCalculator: new (type: P.InteractionType, locationCalculators: Array<P.RelatedLocationCalculator>, interaction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.IPieceInteraction) => P.PieceInteractionCalculator;
        PieceInteractionProfile: new (interactionCalculators: Array<P.PieceInteractionCalculator>) => P.PieceInteractionProfile;
        RelatedLocationCalculator: new (coordinateTranslatorSets: Array<Array<Ts.CoordinateTranslator>>, pathStepLocationValidators: Array<P.IPieceLocationValidator>, pathDestinationValidators: Array<P.IPieceLocationValidator>) => P.RelatedLocationCalculator;
    }

    interface Players {
        Player: new (id: string, isHuman: boolean, isLocal?: boolean) => Bge.Players.Player;
    }

    interface Teams {
        Team: new (owner: Bge.Teams.ITeamOwner, name: string, piecesByInitialLocation: Ts.Dictionary<Ts.Coordinates, P.Piece>) => Bge.Teams.Team;
        TeamFactory: new (pieceFactory: Bge.Pieces.PieceFactory) => Bge.Teams.TeamFactory;
    }

    interface BoardGameEngine {
        Boards: Boards;
        Games: Games;
        Pieces: Pieces;
        Players: Players;
        Teams: Teams;
    }

    export interface AgileObjectsNs {
        TypeScript: TypeScript;
        BoardGameEngine: BoardGameEngine;
    }
}