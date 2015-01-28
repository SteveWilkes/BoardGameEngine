import Game = AgileObjects.BoardGameEngine;
import Ts = AgileObjects.TypeScript;
import Svc = AgileObjects.Angular.Services;

interface TypeScript {
    RandomStringGenerator: new () => Ts.RandomStringGenerator;
}

interface Boards {
    GetBoardTypeQuery: new () => Game.Boards.GetBoardTypeQuery;
}

interface Games {
    GameFactory: new (getGameTypeQuery: Ts.IGetQuery<Game.Games.GameType>) => Game.Games.GameFactory;
    GetGameTypeQuery: new (getBoardTypeQuery: Ts.IGetQuery<Game.Boards.BoardType>) => Game.Games.GetGameTypeQuery;
    GameService: new (idGenerator: Svc.IIdGenerator, gameFactory: Game.Games.GameFactory, teamFactory: Game.Teams.ITeamFactory) => Game.Games.GameService;
    ServerGameCoordinator: new (gameFactory: Game.Games.GameFactory, teamFactory: Game.Teams.ITeamFactory) => Game.Games.ServerGameCoordinator;
}

interface Pieces {
    PieceFactory: new () => Game.Pieces.PieceFactory;
}

interface Teams {
    TeamFactory: new (pieceFactory: Game.Pieces.PieceFactory) => Game.Teams.TeamFactory;
}

interface BoardGameEngine {
    Boards: Boards;
    Games: Games;
    Pieces: Pieces;
    Teams: Teams;
}

interface AgileObjectsNs {
    TypeScript: TypeScript;
    BoardGameEngine: BoardGameEngine;
}