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
        Game: new (id: string, type: G.GameType, board: B.Board, events: G.GameEventSet) => G.Game;
        GameEntityAnnotationMapper: new (patternExpander: TsEv.IEvaluatorPatternExpander) => G.GameEntityAnnotationMapper;
        GameEvaluatorPatternMapper: typeof G.GameEvaluatorPatternMapper;
        GameEventSet: new () => G.GameEventSet;
        GameFactory: new (getGameTypeQuery: Ts.IGetQuery<G.GameType>) => G.GameFactory;
        GameService: new (idGenerator: Svc.IIdGenerator, gameFactory: G.GameFactory, teamFactory: Bge.Teams.TeamFactory) => G.GameService;
        GameType: new (id: string, boardType: B.BoardType, turnDefinition: I.TurnDefinition, pieceDefinitions: Ts.IStringDictionary<P.PieceDefinition>, pieceConfigData: Array<P.PieceConfigData>, annotations: Array<Ts.Annotations.IEntityAnnotation>, eventMappings: Array<Ts.EventMapping>) => G.GameType;
        GameTypeMapper: new (getBoardTypeQuery: Ts.IGetQuery<B.BoardType>, annotationMapper: TsAn.IEntityAnnotationMapper, patternMapper: TsEv.IEvaluatorPatternMapper) => G.GameTypeMapper;
        GameWrapper: new <TTeamConfigurator extends G.ITeamConfigurator>(teamConfigurator: TTeamConfigurator, game: G.Game) => G.GameWrapper<TTeamConfigurator>;
        GetGameTypeQuery: new (gameTypeMapper: G.GameTypeMapper) => G.GetGameTypeQuery;
        PieceWrapper: new (piece: P.Piece) => G.PieceWrapper;
        RunTheBombTeamConfigurator: new (game: G.Game) => G.RunTheBombTeamConfigurator;
        ServerGameCoordinator: new (gameFactory: G.GameFactory, teamFactory: T.TeamFactory) => G.ServerGameCoordinator;
    }

    interface Interactions {
        TurnDefinition: new (interactionDefinitions: Array<I.TurnInteractionDefinition>) => I.TurnDefinition;
        TurnInteractionDefinition: new (interactionType: InteractionType, availabilityEvaluator: I.IPotentialInteractionsEvaluator) => I.TurnInteractionDefinition;
    }

    interface Pieces {
        AttackDestinationPieceInteraction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.AttackDestinationPieceInteraction;
        MovePieceToDestinationInteraction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.MovePieceToDestinationInteraction;
        MovePieceToDestinationPieceInteraction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.MovePieceToDestinationPieceInteraction;
        NullPotentialInteraction: typeof P.NullPotentialInteraction;
        Piece: new (id: string, definitionId: string, imageSource: string, interactionProfile: P.PieceInteractionProfile) => P.Piece;
        PieceConfigData: new (pieceDefinitionId: string, pieceLocation: Ts.Coordinates) => P.PieceConfigData;
        PieceInteractionCalculator: new (type: InteractionType, locationCalculators: Array<P.RelatedLocationCalculator>, interaction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.IPieceInteraction, availabilityEvaluator: P.IPieceEvaluator) => P.PieceInteractionCalculator;
        PieceInteractionProfile: new (interactionCalculators: Array<P.PieceInteractionCalculator>, takenProcessors: Array<P.ITakenPieceProcessor>, pieceId: string, game: G.Game) => P.PieceInteractionProfile;
        RelatedLocationCalculator: new (coordinateTranslatorSets: Array<Array<Ts.CoordinateTranslator>>, pathStepLocationEvaluator: P.IPieceInteractionContextEvaluator, pathDestinationEvaluator: P.IPieceInteractionContextEvaluator) => P.RelatedLocationCalculator;
    }

    interface Players {
        Player: new (id: string, isHuman: boolean, isLocal?: boolean) => Pl.Player;
    }

    interface Teams {
        Team: new (owner: Bge.Teams.ITeamOwner, name: string, piecesByInitialLocation: Ts.Dictionary<P.Piece, Ts.Coordinates>) => Bge.Teams.Team;
        TeamFactory: new () => Bge.Teams.TeamFactory;
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