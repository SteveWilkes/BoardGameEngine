require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

var move = InteractionType.move;
var attack = InteractionType.attack;
var patternMapper = Bge.Games.GameEvaluatorPatternMapper.INSTANCE;

class PieceConfiguration {
    constructor(public pieceDefinitionId: string) {
        this.coordinateTranslatorSets = new Array<Array<Ts.CoordinateTranslator>>();
        this.interactionCalculators = new Array<P.PieceInteractionCalculator>();
    }

    public interactionType: InteractionType;
    public coordinateTranslatorSets: Array<Array<Ts.CoordinateTranslator>>;
    public pathStepLocationEvaluator: P.IPieceInteractionContextEvaluator;
    public pathDestinationEvaluator: P.IPieceInteractionContextEvaluator;
    public interaction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.IPieceInteraction;
    public availabilityEvaluator: P.IPieceEvaluator;
    public interactionCalculators: Array<P.PieceInteractionCalculator>;

    public createInteractionCalculator(): void {
        var relatedLocationCalculator = new Bge.Pieces.RelatedLocationCalculator(
            this.coordinateTranslatorSets,
            this.pathStepLocationEvaluator,
            this.pathDestinationEvaluator);

        this.interactionCalculators.push(
            new Bge.Pieces.PieceInteractionCalculator(
                this.interactionType,
                [relatedLocationCalculator],
                this.interaction,
                this.availabilityEvaluator || TsNs.Evaluation.AlwaysTrueEvaluator.INSTANCE));

        this.coordinateTranslatorSets = new Array<Array<Ts.CoordinateTranslator>>();
    }
}

class PieceConfigurator {
    private _configuration: PieceConfiguration;

    constructor(pieceDefinitionId: string) {
        this._configuration = new PieceConfiguration(pieceDefinitionId);
    }

    public withUdlrInfiniteMovement(): PieceConfigurator {
        return this.withUdlrMovementBy(0);
    }

    public withUdlrMovementBy(distance: number): PieceConfigurator {
        this._configuration.interactionType = move;
        this._configuration.interaction = Bge.Pieces.MovePieceToDestinationInteraction;

        return this._addUdlrTranslators(distance);
    }

    public withUdlrAttachmentTo(pieceDefinitionIds: Array<string>, distance?: number): PieceConfigurator {
        this._configuration.interactionType = move;
        this._configuration.interaction = Bge.Pieces.MovePieceToDestinationPieceInteraction;

        this._addEvaluator(
            () => "l.p.d=" + pieceDefinitionIds.join(","),
            "pathDestinationEvaluator");

        return this._addUdlrTranslators(distance || 1);
    }

    public withUdlrAttackOver(distance: number): PieceConfigurator {
        this._configuration.interactionType = attack;
        this._configuration.interaction = Bge.Pieces.AttackDestinationPieceInteraction;

        return this._addUdlrTranslators(distance);
    }

    private _addUdlrTranslators(distance: number): PieceConfigurator {
        var up = [new TsNs.CoordinateTranslator("up", distance)];
        var down = [new TsNs.CoordinateTranslator("down", distance)];
        var left = [new TsNs.CoordinateTranslator("left", distance)];
        var right = [new TsNs.CoordinateTranslator("right", distance)];

        this._configuration.coordinateTranslatorSets.push(up, down, left, right);

        return this;
    }

    public wherePathStepsMustBeUnoccupied(): PieceConfigurator {
        return this._addEvaluator(() => "!l.io", "pathStepLocationEvaluator");
    }

    public whereDestinationsMustBeUnoccupied(): PieceConfigurator {
        return this._addEvaluator(() => "!l.io", "pathDestinationEvaluator");
    }

    public wherePieceMustBeOccupied(): PieceConfigurator {
        return this._addEvaluator(() => "io", "availabilityEvaluator");
    }

    private _addEvaluator(evaluatorSignatureFactory: () => string, evaluatorName: string) {
        var evaluatorSignature = evaluatorSignatureFactory();
        var evaluatorPattern = patternMapper.map(evaluatorSignature);
        var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse<P.IPieceLocation>(evaluatorPattern);
        this._configuration[evaluatorName] = evaluator;
        return this;
    }

    public and(): PieceConfigurator {
        this._configuration.createInteractionCalculator();
        return this;
    }

    public getConfiguration(): PieceConfiguration {
        this._configuration.createInteractionCalculator();
        return this._configuration;
    }
}

class PieceBuilder {
    static INSTANCE = new PieceBuilder();

    private _idGenerator: Ts.RandomStringGenerator;

    constructor() {
        this._idGenerator = new TsNs.RandomStringGenerator();
    }

    public createPiece(configuration: PieceConfiguration, game: G.Game): P.Piece {
        var pieceId = this._idGenerator.generate(6);

        var interactionProfile = new Bge.Pieces.PieceInteractionProfile(
            configuration.interactionCalculators,
            [],
            pieceId,
            game);

        return new Bge.Pieces.Piece(
            pieceId,
            configuration.pieceDefinitionId,
            "test.gif",
            interactionProfile);
    }
}

class TeamConfiguration {
    constructor(public teamOwner: Pl.Player) {
        this.pieceInitialLocations = new TsNs.Dictionary<PieceConfiguration, Array<Ts.Coordinates>>();
    }

    public pieceInitialLocations: Ts.Dictionary<PieceConfiguration, Array<Ts.Coordinates>>;
}

class TeamConfigurator {
    private _configuration: TeamConfiguration;

    constructor(teamOwner: Pl.Player) {
        this._configuration = new TeamConfiguration(teamOwner);
    }

    public withAPieceAt(coordinateSignatures: Array<string>, config: (configurator: PieceConfigurator) => void): TeamConfigurator {
        var configurator = new PieceConfigurator(this.getPieceDefinitionId());
        config(configurator);
        var configuration = configurator.getConfiguration();
        for (var i = 0; i < coordinateSignatures.length; i++) {
            var configurationCoordinates = this._configuration.pieceInitialLocations
                .getOrAdd(configuration,() => new Array<Ts.Coordinates>());

            configurationCoordinates.push(
                TsNs.CoordinatesLibrary.INSTANCE.get(coordinateSignatures[i]));
        }
        return this;
    }

    public getPieceDefinitionId(): string {
        var allPieces = this._configuration.pieceInitialLocations.keys;
        if (allPieces.length === 0) { return "1"; }
        var latestPieceConfiguration = allPieces[allPieces.length - 1];
        var latestDefinitionId = parseInt(latestPieceConfiguration.pieceDefinitionId);
        return (latestDefinitionId + 1).toString();
    }

    public getConfiguration(): TeamConfiguration {
        return this._configuration;
    }
}

class TeamBuilder {
    static INSTANCE = new TeamBuilder();

    public createTeam(configuration: TeamConfiguration, game: G.Game): T.Team {
        var pieceInitialLocations = new TsNs.Dictionary<P.Piece, Ts.Coordinates>();
        for (var i = 0; i < configuration.pieceInitialLocations.count; i++) {
            var pieceConfiguration = configuration.pieceInitialLocations.keys[i];
            var pieceConfigurationCoordinates = configuration.pieceInitialLocations.values[i];

            for (var j = 0; j < pieceConfigurationCoordinates.length; j++) {
                var piece = PieceBuilder.INSTANCE.createPiece(pieceConfiguration, game);
                pieceInitialLocations.add(piece, pieceConfigurationCoordinates[j]);
            }
        }

        return new Bge.Teams.Team(
            configuration.teamOwner,
            configuration.teamOwner.id + "-Team" + configuration.teamOwner.teams.length + 1,
            pieceInitialLocations);
    }
}

class GameConfiguration {
    constructor() {
        this.boardRowConfigs = new Array<B.BoardRowConfig>();
        this.boardPositions = new Array<B.BoardPosition>();
        this.players = new Array<Pl.Player>();
        this.teamConfigurations = new Array<TeamConfiguration>();
    }

    public turnDefinition: I.TurnDefinition;
    public boardRowConfigs: Array<B.BoardRowConfig>;
    public boardPositions: Array<B.BoardPosition>;
    public players: Array<Pl.Player>;
    public teamConfigurations: Array<TeamConfiguration>;

    public addPlayer(isHuman: boolean, isLocal: boolean) {
        var player = new Bge.Players.Player("Player" + this.players.length + 1, isHuman, isLocal);
        this.players.push(player);
    }

}

class GameConfigurator {
    private _configuration: GameConfiguration;

    constructor() {
        this._configuration = new GameConfiguration();
    }

    // #region Game Type

    public withAttackThenMoveTurnInteractions(): GameConfigurator {
        return this.withTurnInteractions([attack, move]);
    }

    public withTurnInteractions(turnInteractionTypes: Array<InteractionType>): GameConfigurator {
        var turnInteractionDefinitions = new Array<I.TurnInteractionDefinition>(turnInteractionTypes.length);
        for (var i = 0; i < turnInteractionTypes.length; i++) {
            turnInteractionDefinitions[i] = new Bge.Interactions.TurnInteractionDefinition(
                turnInteractionTypes[i],
                TsNs.Evaluation.AlwaysTrueEvaluator.INSTANCE);
        }
        this._configuration.turnDefinition = new Bge.Interactions.TurnDefinition(turnInteractionDefinitions);
        return this;
    }

    // #endregion

    // #region Board

    public withA3x3NorthSouthBoard(): GameConfigurator {
        this.withASquareBoardOfSize(3);
        this.withNorthSouthBoardPositions();
        return this;
    }

    public withASquareBoardOfSize(size: number): GameConfigurator {
        for (var i = 0; i < size; i++) {
            var tileConfigs = new Array<boolean>(size);
            for (var j = 0; j < size; j++) {
                tileConfigs[j] = true;
            }
            this._configuration.boardRowConfigs.push(new Bge.Boards.BoardRowConfig(tileConfigs));
        }

        return this;
    }

    public withNorthSouthBoardPositions(): GameConfigurator {
        this.withBoardPosition("South", coordinates => coordinates, true);
        this.withBoardPosition("North", TsNs.CoordinateTranslatorLibrary.SOUTH_TO_NORTH, false);
        return this;
    }

    public withBoardPosition(
        name: string,
        coordinateTranslator: (coordinates: Ts.Coordinates, gridSize: number) => Ts.Coordinates,
        isFocusPosition: boolean): GameConfigurator {

        this._configuration.boardPositions.push(
            new Bge.Boards.BoardPosition(name, coordinateTranslator, isFocusPosition));

        return this;
    }

    // #endregion

    // #region Players

    public withHumanLocalAndRemotePlayers(): GameConfigurator {
        this.withAHumanPlayerLocally();
        this.withAHumanPlayerRemotely();
        return this;
    }

    public withAHumanPlayerLocally(): GameConfigurator {
        this._configuration.addPlayer(true, true);
        return this;
    }

    public withAHumanPlayerRemotely(): GameConfigurator {
        this._configuration.addPlayer(true, false);
        return this;
    }

    // #endregion

    // #region Teams

    public withATeamForPlayer(playerNumber: number, config: (configurator: TeamConfigurator) => void): GameConfigurator {
        var teamOwner = this._configuration.players[playerNumber - 1];
        var configurator = new TeamConfigurator(teamOwner);
        config(configurator);
        this._configuration.teamConfigurations.push(configurator.getConfiguration());
        return this;
    }

    // #endregion

    public getConfiguration(): GameConfiguration {
        return this._configuration;
    }
}

class GameBuilder {
    static INSTANCE = new GameBuilder();

    public createGame(configuration: GameConfiguration): G.Game {
        var boardType = this._getBoardType(configuration);

        var gameType = new Bge.Games.GameType("test", boardType, 2, configuration.turnDefinition, null, null, [], []);
        var gameEvents = new Bge.Games.GameEventSet();
        var board = new Bge.Boards.Board(boardType, gameEvents);

        var game = new Bge.Games.Game("test", gameType, board, gameEvents);

        this._addPlayers(configuration, game);
        this._addTeams(configuration, game);

        return game;
    }

    private _getBoardType(configuration: GameConfiguration) {
        return new Bge.Boards.BoardType(
            "test",
            "test",
            configuration.boardPositions,
            configuration.boardRowConfigs,
            new Bge.Boards.BoardOrientationTranslator());
    }

    private _addPlayers(configuration: GameConfiguration, game: G.Game) {
        for (var i = 0; i < configuration.players.length; i++) {
            game.add(configuration.players[i]);
        }
    }

    private _addTeams(configuration: GameConfiguration, game: G.Game) {
        var teamConfigurations = configuration.teamConfigurations;
        for (var i = 0; i < teamConfigurations.length; i++) {
            var team = TeamBuilder.INSTANCE.createTeam(teamConfigurations[i], game);
            game.board.add(team);
        }
    }
}

// ReSharper disable once UnusedLocals
var gameBuilder = {
    createGame: (config: (configurator: GameConfigurator) => void) => {
        var configurator = new GameConfigurator();
        config(configurator);
        return GameBuilder.INSTANCE.createGame(configurator.getConfiguration());
    },
    createDefaultGame: function () {
        return this.createGame((gc: GameConfigurator) => gc
            .withAttackThenMoveTurnInteractions()
            .withA3x3NorthSouthBoard()
            .withHumanLocalAndRemotePlayers()
            .withATeamForPlayer(1, tc => tc
            .withAPieceAt(["1x1"], pc => pc
            .withUdlrMovementBy(1))));
    },
    startGame: function (config: (configurator: GameConfigurator) => void) {
        var game: G.Game = this.createGame(config);
        game.start();
        return game;
    },
    startDefaultGame: function () {
        var game: G.Game = this.createDefaultGame();
        game.start();
        return game;
    }
};

export = gameBuilder;