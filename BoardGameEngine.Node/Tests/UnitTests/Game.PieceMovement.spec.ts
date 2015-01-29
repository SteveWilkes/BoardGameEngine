var move = AgileObjects.BoardGameEngine.Pieces.InteractionType.Move;
var attack = AgileObjects.BoardGameEngine.Pieces.InteractionType.Attack;

require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

describe("Game", () => {
    describe("Piece movement", () => {

        it("Should calculate an L-shape location path", () => {
            var game = createTestGame();
            var tiles = game.board.getTiles();
            var bottomLeftTile = tiles["1x1"];

            var oneSpaceUp = new TsNs.CoordinateTranslator("up", 1);
            var twoSpacesRight = new TsNs.CoordinateTranslator("right", 2);
            var lShapeLocationCalculator = new Bge.Pieces.RelatedLocationCalculator([[oneSpaceUp, twoSpacesRight]], [], []);
            var lShapeFromBottomLeft = lShapeLocationCalculator.calculateLocationPaths(bottomLeftTile, game);

            expect(lShapeFromBottomLeft).not.toBeNull();
            expect(lShapeFromBottomLeft.length).toBe(3); // Arrays are returned for each path or sub-path
            expect(lShapeFromBottomLeft[2].length).toBe(4);
            expect(lShapeFromBottomLeft[2][0].coordinates.signature).toBe("1x1"); // starting point, then
            expect(lShapeFromBottomLeft[2][1].coordinates.signature).toBe("2x1"); // one space up, then
            expect(lShapeFromBottomLeft[2][2].coordinates.signature).toBe("2x2"); // first space right, then
            expect(lShapeFromBottomLeft[2][3].coordinates.signature).toBe("2x3"); // second space right
        });

        it("Should move a piece", () => {
            var game = createTestGame();
            var piece = game.teams[0].getPieces()["test"];

            expect(piece.location).not.toBeNull();
            expect(piece.location.coordinates.signature).toBe("1x1");

            var piecePotentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, game);

            expect(piecePotentialInteractions).not.toBeNull();
            expect(Object.keys(piecePotentialInteractions).length).toBe(1);

            for (var interactionId in piecePotentialInteractions) {
                piecePotentialInteractions[interactionId].complete();
                break;
            }

            expect(piece.location.coordinates.signature).toBe("2x1");
        });

        function createTestGame() {
            var boardBottomPosition = new Bge.Boards.BoardPosition("bottom", coordinates => coordinates, true);
            var threeTileRow = new Bge.Boards.BoardRowConfig([true, true, true]);
            var boardType = new Bge.Boards.BoardType("test", "test", [boardBottomPosition], [threeTileRow, threeTileRow, threeTileRow], new Bge.Boards.BoardOrientationTranslator());
            var allInteractionsAlwaysAvailable = { getCurrentlySupportedInteractions() { return [move, attack]; } };
            var gameType = new Bge.Games.GameType("test", boardType, allInteractionsAlwaysAvailable);
            var gameEvents = new Bge.Games.GameEventSet();
            var board = new Bge.Boards.Board(boardType, gameEvents);

            expect(board.rows.length).toBe(3);
            expect(Object.keys(board.getTiles()).length).toBe(9);

            var game = new Bge.Games.Game("test", gameType, board, gameEvents);

            var player = new Bge.Players.Player("test", true, true);

            game.add(player);

            var oneSpaceUp = new TsNs.CoordinateTranslator("up", 1);
            var pieceMovementLocationCalculator = new Bge.Pieces.RelatedLocationCalculator([[oneSpaceUp]], [], []);
            var pieceMovementCalculator = new Bge.Pieces.PieceInteractionCalculator(move, [pieceMovementLocationCalculator], Bge.Pieces.MovePieceToDestinationInteraction);
            var pieceInteractionProfile = new Bge.Pieces.PieceInteractionProfile([pieceMovementCalculator]);
            var piece = new Bge.Pieces.Piece("test", "1", "test.gif", pieceInteractionProfile);
            var piecesByInitialLocation = new TsNs.Dictionary<AgileObjects.TypeScript.Coordinates, AgileObjects.BoardGameEngine.Pieces.Piece>()
                .add(new TsNs.Coordinates(1, 1), piece);

            var team = new Bge.Teams.Team(player, "test", piecesByInitialLocation);

            board.add(team);

            return game;
        }
    });
})