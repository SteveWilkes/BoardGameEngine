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
        CoordinateTranslatorRegistry: typeof Ts.CoordinateTranslatorRegistry;
        CoordinatesRegistry: typeof Ts.CoordinatesRegistry;
        Dictionary: new <TKey, TValue>() => Ts.Dictionary<TKey, TValue>;
        Joq: typeof Ts.Joq;
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
        GameService: new (idGenerator: Svc.IIdGenerator, gameFactory: G.GameFactory, teamFactory: Bge.Teams.TeamFactory) => G.GameService;
        GameType: new (id: string, boardType: B.BoardType, turnInteractions: Array<P.InteractionType>, pieceDefinitions: Ts.IStringDictionary<P.PieceDefinition>, pieceConfigData: Array<P.PieceConfigData>) => G.GameType;
        GetGameTypeQuery: new (gameTypeMapper: G.GameTypeMapper) => G.GetGameTypeQuery;
        GameTypeMapper: new (getBoardTypeQuery: Ts.IGetQuery<B.BoardType>) => G.GameTypeMapper;
        ServerGameCoordinator: new (gameFactory: G.GameFactory, teamFactory: Bge.Teams.TeamFactory) => G.ServerGameCoordinator;
    }

    interface Pieces {
        AlwaysValidLocationEvaluator: typeof P.AlwaysValidLocationEvaluator;
        AttackDestinationPieceInteraction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.AttackDestinationPieceInteraction;
        IsOccupiedLocationEvaluator: new () => P.IsOccupiedLocationEvaluator;
        IsUnoccupiedLocationEvaluator: new () => P.IsUnoccupiedLocationEvaluator;
        IsUnoccupiedPieceEvaluator: new () => P.IsUnoccupiedPieceEvaluator;
        MovePieceToDestinationInteraction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.MovePieceToDestinationInteraction;
        MovePieceToDestinationPieceInteraction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.MovePieceToDestinationPieceInteraction;
        NullPotentialInteraction: typeof P.NullPotentialInteraction;
        OccupiedLocationEvaluator: new (sameTeamDroppablePieceDefinitionIds: Array<string>, otherTeamDroppablePieceDefinitionIds: Array<string>) => P.OccupiedLocationEvaluator;
        Piece: new (id: string, definitionId: string, imageSource: string, interactionProfile: P.PieceInteractionProfile) => P.Piece;
        PieceInteractionCalculator: new (type: P.InteractionType, locationCalculators: Array<P.RelatedLocationCalculator>, interaction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.IPieceInteraction, availabilityEvaluator: P.IPieceAndLocationEvaluator) => P.PieceInteractionCalculator;
        PieceInteractionProfile: new (interactionCalculators: Array<P.PieceInteractionCalculator>) => P.PieceInteractionProfile;
        RelatedLocationCalculator: new (coordinateTranslatorSets: Array<Array<Ts.CoordinateTranslator>>, pathStepLocationEvaluators: Array<P.IPieceAndLocationEvaluator>, pathDestinationEvaluators: Array<P.IPieceAndLocationEvaluator>) => P.RelatedLocationCalculator;
    }

    interface Players {
        Player: new (id: string, isHuman: boolean, isLocal?: boolean) => Bge.Players.Player;
    }

    interface Teams {
        Team: new (owner: Bge.Teams.ITeamOwner, name: string, piecesByInitialLocation: Ts.Dictionary<Ts.Coordinates, P.Piece>) => Bge.Teams.Team;
        TeamFactory: new () => Bge.Teams.TeamFactory;
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