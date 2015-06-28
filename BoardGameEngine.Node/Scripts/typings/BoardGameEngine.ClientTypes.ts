module Typings {
    import Bge = AgileObjects.BoardGameEngine;
    import TsAn = Ts.Annotations;
    import TsEv = Ts.Evaluation;
    import Svc = AgileObjects.Angular.Services;

    interface TypeScriptAnnotations {
        IEntityAnnotationMapper: TsAn.IEntityAnnotationMapper
    }

    interface TypeScriptEvaluation {
        AlwaysTrueEvaluator: typeof Ts.Evaluation.AlwaysTrueEvaluator;
        BooleanMethodEvaluator: new <T>(methodName: string) => Ts.Evaluation.BooleanMethodEvaluator<T>;
        CompositeAndEvaluator: new <T>(evaluators: Array<Ts.Evaluation.IEvaluator<T>>) => Ts.Evaluation.CompositeAndEvaluator<T>;
        CompositeOrEvaluator: new <T>(evaluators: Array<Ts.Evaluation.IEvaluator<T>>) => Ts.Evaluation.CompositeOrEvaluator<T>;
        EvaluatorParser: typeof Ts.Evaluation.EvaluatorParser;
        NegationEvaluator: new <T>(evaluator: Ts.Evaluation.IEvaluator<T>) => Ts.Evaluation.NegationEvaluator<T>;
        PropertyEvaluator: new <T>(propertyName: string, allowedValues: Array<any>) => Ts.Evaluation.PropertyEvaluator<T>;
    }

    interface TypeScript {
        Annotations: TypeScriptAnnotations;
        Coordinates: new (row: number, column: number, signature?: string) => Ts.Coordinates;
        CoordinateTranslator: new (directionFunctionName: string, distance: number) => Ts.CoordinateTranslator;
        CoordinateTranslatorLibrary: typeof Ts.CoordinateTranslatorLibrary;
        CoordinatesLibrary: typeof Ts.CoordinatesLibrary;
        Dictionary: new <TKey, TValue>() => Ts.Dictionary<TKey, TValue>;
        Evaluation: TypeScriptEvaluation;
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
        Game: new (id: string, type: G.GameType, owner: Pl.Player, board: B.Board, events: G.GameEventSet) => G.Game;
        GameData: new (game: G.Game) => G.GameData;
        GameEntityAnnotationMapper: new (patternExpander: TsEv.IEvaluatorPatternExpander) => G.GameEntityAnnotationMapper;
        GameEvaluatorPatternMapper: typeof G.GameEvaluatorPatternMapper;
        GameEventSet: new () => G.GameEventSet;
        GameFactory: new (getGameTypeQuery: Ts.IGetQuery<G.GameType>) => G.GameFactory;
        GameMapper: new (gameFactory: G.GameFactory, teamFactory: T.TeamFactory) => G.GameMapper;
        GameService: new (idGenerator: Svc.IIdGenerator, gameFactory: G.GameFactory, teamFactory: T.TeamFactory) => G.GameService;
        GameType: new (id: string, boardType: B.BoardType, maximumNumberOfTeams: number, turnDefinition: I.TurnDefinition, pieceDefinitions: Ts.IStringDictionary<P.PieceDefinition>, pieceConfigData: Array<P.PieceConfigData>, annotations: Array<Ts.Annotations.IEntityAnnotation>, eventMappings: Array<Ts.EventMapping>) => G.GameType;
        GameTypeMapper: new (getBoardTypeQuery: Ts.IGetQuery<B.BoardType>, annotationMapper: TsAn.IEntityAnnotationMapper, patternMapper: TsEv.IEvaluatorPatternMapper) => G.GameTypeMapper;
        GameWrapper: new <TTeamConfigurator extends G.ITeamConfigurator>(gameFactory: G.GameFactory, teamConfigurator: TTeamConfigurator) => G.GameWrapper<TTeamConfigurator>;
        GetGameTypeQuery: new (gameTypeMapper: G.GameTypeMapper) => G.GetGameTypeQuery;
        PieceWrapper: new (piece: Piece) => G.PieceWrapper;
        RunTheBombTeamConfigurator: new () => G.RunTheBombTeamConfigurator;
    }

    interface Interactions {
        InteractionId: typeof I.InteractionId;
        TurnApplicationManager: new (game: G.Game) => I.TurnApplicationManager;
        TurnCompletionManager: typeof I.TurnCompletionManager;
        TurnData: typeof I.TurnData;
        TurnDefinition: new (interactionDefinitions: Array<I.TurnInteractionDefinition>) => I.TurnDefinition;
        TurnInteractionDefinition: new (interactionType: InteractionType, availabilityEvaluator: I.IPotentialInteractionsEvaluator) => I.TurnInteractionDefinition;
    }

    interface Pieces {
        AttackDestinationPieceInteraction: new (id: string, piece: Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.AttackDestinationPieceInteraction;
        MovePieceToDestinationInteraction: new (id: string, piece: Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.MovePieceToDestinationInteraction;
        MovePieceToDestinationPieceInteraction: new (id: string, piece: Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.MovePieceToDestinationPieceInteraction;
        NullPotentialInteraction: typeof P.NullPotentialInteraction;
        Piece: new (id: string, definitionId: string, imageSource: string, interactionProfile: P.PieceInteractionProfile) => Piece;
        PieceConfigData: new (pieceDefinitionId: string, pieceLocation: Ts.Coordinates) => P.PieceConfigData;
        PieceInteractionCalculator: new (type: InteractionType, locationCalculators: Array<P.RelatedLocationCalculator>, interaction: new (id: string, piece: Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.IPieceInteraction, availabilityEvaluator: P.IPieceEvaluator) => P.PieceInteractionCalculator;
        PieceInteractionMonitor: new (timeoutService: (action: () => void, delay: number) => void, game: G.Game) => P.PieceInteractionMonitor;
        PieceInteractionProfile: new (interactionCalculators: Array<P.PieceInteractionCalculator>, takenProcessors: Array<P.ITakenPieceProcessor>, pieceId: string, game: G.Game) => P.PieceInteractionProfile;
        RelatedLocationCalculator: new (coordinateTranslatorSets: Array<Array<Ts.CoordinateTranslator>>, pathStepLocationEvaluator: P.IPieceInteractionContextEvaluator, pathDestinationEvaluator: P.IPieceInteractionContextEvaluator) => P.RelatedLocationCalculator;
    }

    interface Players {
        Player: new (id: string, name: string, isHuman: boolean, isLocal?: boolean) => Pl.Player;
        PlayerData: new (player?: Pl.Player) => Pl.PlayerData;
    }

    interface Teams {
        Team: new (owner: T.ITeamOwner, name: string, piecesByInitialLocation: Ts.Dictionary<Piece, Ts.Coordinates>) => T.Team;
        TeamFactory: new () => T.TeamFactory;
    }

    interface BoardGameEngine {
        Boards: Boards;
        Games: Games;
        Interactions: Interactions;
        Pieces: Pieces;
        Players: Players;
        Teams: Teams;
    }

    export interface AgileObjectsNs {
        TypeScript: TypeScript;
        BoardGameEngine: BoardGameEngine;
    }
}