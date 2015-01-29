import B = AgileObjects.BoardGameEngine.Boards;
import G = AgileObjects.BoardGameEngine.Games;
import P = AgileObjects.BoardGameEngine.Pieces;
import Pl = AgileObjects.BoardGameEngine.Players;
import Ts = AgileObjects.TypeScript;

var move = AgileObjects.BoardGameEngine.Pieces.InteractionType.Move;
var attack = AgileObjects.BoardGameEngine.Pieces.InteractionType.Attack;

require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

class GameConfiguration {
    constructor() {
        this.boardRowConfigs = new Array<B.BoardRowConfig>();
        this.boardPositions = new Array<B.BoardPosition>();
        this.players = new Array<Pl.Player>();
    }

    public boardRowConfigs: Array<B.BoardRowConfig>;
    public boardPositions: Array<B.BoardPosition>;
    public players: Array<Pl.Player>;

    public addPlayer(isHuman: boolean, isLocal: boolean) {
        var player = new Bge.Players.Player("player " + this.players.length + 1, isHuman, isLocal);
        this.players.push(player);
    }
}

class GameConfigurator {
    private _configuration: GameConfiguration;

    constructor() {
        this._configuration = new GameConfiguration();
    }

    // #region Board

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

    public withBoardPosition(
        name: string,
        coordinateTranslator: (coordinates: Ts.Coordinates, gridSize: number) => Ts.Coordinates,
        isFocusPosition: boolean): GameConfigurator {

        this._configuration.boardPositions.push(
            new Bge.Boards.BoardPosition(name, coordinateTranslator, isFocusPosition));

        return this;
    }

    // #endregion

    public withAHumanPlayer(isLocal: boolean): GameConfigurator {
        this._configuration.addPlayer(true, isLocal);
        return this;
    }

    public getConfiguration(): GameConfiguration {
        return this._configuration;
    }
}

class GameBuilder {
    constructor(configurator: GameConfigurator) {
        var configuration = configurator.getConfiguration();
        var boardType = this._getBoardType(configuration);

        var allInteractionsAlwaysAvailable = { getCurrentlySupportedInteractions() { return [move, attack]; } };
        var gameType = new Bge.Games.GameType("test", boardType, allInteractionsAlwaysAvailable);
        var gameEvents = new Bge.Games.GameEventSet();
        var board = new Bge.Boards.Board(boardType, gameEvents);

        this.game = new Bge.Games.Game("test", gameType, board, gameEvents);

        var player = new Bge.Players.Player("test", true, true);

        this._addPlayers(configuration);

        var oneSpaceUp = new TsNs.CoordinateTranslator("up", 1);
        var pieceMovementLocationCalculator = new Bge.Pieces.RelatedLocationCalculator([[oneSpaceUp]], [], []);
        var pieceMovementCalculator = new Bge.Pieces.PieceInteractionCalculator(move, [pieceMovementLocationCalculator], Bge.Pieces.MovePieceToDestinationInteraction);
        var pieceInteractionProfile = new Bge.Pieces.PieceInteractionProfile([pieceMovementCalculator]);
        var piece = new Bge.Pieces.Piece("test", "1", "test.gif", pieceInteractionProfile);
        var piecesByInitialLocation = new TsNs.Dictionary<AgileObjects.TypeScript.Coordinates, AgileObjects.BoardGameEngine.Pieces.Piece>()
            .add(new TsNs.Coordinates(1, 1), piece);

        var team = new Bge.Teams.Team(player, "test", piecesByInitialLocation);

        board.add(team);
    }

    private _getBoardType(configuration: GameConfiguration) {
        return new Bge.Boards.BoardType(
            "test",
            "test",
            configuration.boardPositions,
            configuration.boardRowConfigs,
            new Bge.Boards.BoardOrientationTranslator());
    }

    private _addPlayers(configuration: GameConfiguration) {
        for (var i = 0; i < configuration.players.length; i++) {
            this.game.add(configuration.players[i]);
        }
    }

    public game: G.Game;
}

// ReSharper disable once UnusedLocals
var gameBuilder = {
    createGame: (configuration: GameConfigurator) => { return new GameBuilder(configuration).game; },
    createDefaultGame: function () {
        return this.createGame(new GameConfigurator()
            .withASquareBoardOfSize(3)
            .withBoardPosition("South", coordinates => coordinates, true)
            .withBoardPosition("North", TsNs.CoordinateTranslatorRegistry.SOUTH_TO_NORTH, false)
            .withAHumanPlayer(true)
            .withAHumanPlayer(false));
    }
};

export = gameBuilder;