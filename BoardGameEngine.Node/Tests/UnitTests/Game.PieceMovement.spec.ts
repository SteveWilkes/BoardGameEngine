require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: AgileObjectsNs = require("../../InternalModules");

describe("Game", () => {
    describe("Piece movement", () => {
        it("Should move a piece", () => {
            var idGenerator = new Ao.TypeScript.RandomStringGenerator();
            var getBoardTypeQuery = new Ao.BoardGameEngine.Boards.GetBoardTypeQuery();
            var getGameTypeQuery = new Ao.BoardGameEngine.Games.GetGameTypeQuery(getBoardTypeQuery);
            var gameFactory = new Ao.BoardGameEngine.Games.GameFactory(getGameTypeQuery);
            var pieceFactory = new Ao.BoardGameEngine.Pieces.PieceFactory();
            var teamFactory = new Ao.BoardGameEngine.Teams.TeamFactory(pieceFactory);
            var gameService = new Ao.BoardGameEngine.Games.GameService(idGenerator, gameFactory, teamFactory);

            var game = gameService.createDefaultGame("1");

            expect(game).not.toBeNull();
        });
    });
})