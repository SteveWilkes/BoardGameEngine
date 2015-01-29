var move = AgileObjects.BoardGameEngine.Pieces.InteractionType.Move;
var attack = AgileObjects.BoardGameEngine.Pieces.InteractionType.Attack;

require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameBuilder = require("./Game.GameBuilder");

describe("Game", () => {
    describe("Piece movement", () => {

        it("Should calculate an L-shape location path", () => {
            var game = gameBuilder.createDefaultGame();
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

        it("Should move a piece to an empty tile", () => {
            var game = gameBuilder.createDefaultGame();
            var destinationTile = game.board.getTiles()["2x1"];

            expect(destinationTile).not.toBeNull();
            expect(destinationTile.isOccupied()).toBeFalsy();

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

            expect(piece.location).toBe(destinationTile);
            expect(destinationTile.isOccupied()).toBeTruthy();
        });
    });
})