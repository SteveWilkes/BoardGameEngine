require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

var move = InteractionType.move;
var attack = InteractionType.attack;
var evaluatorMapper = new Bge.Pieces.Evaluation.PieceEvaluatorMapper();

class PieceConfiguration {
    constructor(public pieceDefinitionId: string) {
        this.coordinateTranslatorSets = new Array<Array<Ts.CoordinateTranslator>>();
        this.interactionCalculators = new Array<P.PieceInteractionCalculator>();
    }

    public interactionType: InteractionType;
    public coordinateTranslatorSets: Array<Array<Ts.CoordinateTranslator>>;
    public pathStepLocationEvaluator: P.Evaluation.IPieceInteractionContextEvaluator;
    public pathDestinationEvaluator: P.Evaluation.IPieceInteractionContextEvaluator;
    public interaction: new (id: string, piece: P.Piece, path: Array<P.IPieceLocation>, events: G.GameEventSet) => P.IPieceInteraction;
    public availabilityEvaluator: P.Evaluation.IPieceEvaluator;
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
        var evaluatorPattern = evaluatorMapper.map(evaluatorSignature);
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

    public createPiece(configuration: PieceConfiguration): P.Piece {
        var pieceInteractionProfile = new Bge.Pieces.PieceInteractionProfile(configuration.interactionCalculators);
        var pieceId = this._idGenerator.generate(6);
        return new Bge.Pieces.Piece(pieceId, configuration.pieceDefinitionId, "test.gif", pieceInteractionProfile);
    }
}

class TeamConfiguration {
    constructor(public teamOwner: Pl.Player) {
        this.piecesByInitialLocation = new TsNs.Dictionary<Ts.Coordinates, P.Piece>();
    }

    public piecesByInitialLocation: Ts.Dictionary<Ts.Coordinates, P.Piece>;
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
            var rowAndColumn = coordinateSignatures[i].split("x");
            var coordinates = TsNs.CoordinatesRegistry.INSTANCE.get(parseInt(rowAndColumn[0]), parseInt(rowAndColumn[1]));
            var piece = PieceBuilder.INSTANCE.createPiece(configuration);
            this._configuration.piecesByInitialLocation.add(coordinates, piece);
        }
        return this;
    }

    public getPieceDefinitionId(): string {
        var allPieces = this._configuration.piecesByInitialLocation.values;
        if (allPieces.length === 0) { return "1"; }
        var latestPiece = allPieces[allPieces.length - 1];
        var latestDefinitionId = parseInt(latestPiece.definitionId);
        return (latestDefinitionId + 1).toString();
    }

    public getConfiguration(): TeamConfiguration {
        return this._configuration;
    }
}

class TeamBuilder {
    static INSTANCE = new TeamBuilder();

    public createTeam(configuration: TeamConfiguration): T.Team {
        return new Bge.Teams.Team(
            configuration.teamOwner,
            configuration.teamOwner.id + "-Team" + configuration.teamOwner.teams.length + 1,
            configuration.piecesByInitialLocation);
    }
}

class GameConfiguration {
    constructor() {
        this.turnInteractions = new Array<InteractionType>();
        this.boardRowConfigs = new Array<B.BoardRowConfig>();
        this.boardPositions = new Array<B.BoardPosition>();
        this.players = new Array<Pl.Player>();
        this.teams = new Array<T.Team>();
    }

    public turnInteractions: Array<InteractionType>;
    public boardRowConfigs: Array<B.BoardRowConfig>;
    public boardPositions: Array<B.BoardPosition>;
    public players: Array<Pl.Player>;
    public teams: Array<T.Team>;

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

    public withTurnInteractions(turnInteractions: Array<InteractionType>): GameConfigurator {
        this._configuration.turnInteractions = turnInteractions;
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
        this.withBoardPosition("North", TsNs.CoordinateTranslatorRegistry.SOUTH_TO_NORTH, false);
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
        var team = TeamBuilder.INSTANCE.createTeam(configurator.getConfiguration());
        this._configuration.teams.push(team);
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

        var gameType = new Bge.Games.GameType("test", boardType, configuration.turnInteractions, null, null);
        var gameEvents = new Bge.Games.GameEventSet();
        var board = new Bge.Boards.Board(boardType, gameEvents);

        var game = new Bge.Games.Game("test", gameType, board, gameEvents);

        this._addPlayers(game, configuration);
        this._addTeams(game, configuration);

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

    private _addPlayers(game: G.Game, configuration: GameConfiguration) {
        for (var i = 0; i < configuration.players.length; i++) {
            game.add(configuration.players[i]);
        }
    }

    private _addTeams(game: G.Game, configuration: GameConfiguration) {
        for (var i = 0; i < configuration.teams.length; i++) {
            game.board.add(configuration.teams[i]);
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