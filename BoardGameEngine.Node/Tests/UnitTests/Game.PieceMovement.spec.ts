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
            var game: AgileObjects.BoardGameEngine.Games.Game = gameBuilder.createDefaultGame();
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
            expect(lShapeFromBottomLeft[2][2].coordinates.signature).toBe("2x2"); // one space right, then
            expect(lShapeFromBottomLeft[2][3].coordinates.signature).toBe("2x3"); // another space right
        });

        it("Should calculate up-down-left-right movement interactions", () => {
            var game: AgileObjects.BoardGameEngine.Games.Game = gameBuilder.createGame(gc => gc
                .withA3x3NorthSouthBoard()
                .withHumanLocalAndRemotePlayers()
                .withATeamForPlayer(1, tc => tc
                    .withAPieceAt(["1x1"], pc => pc
                        .withUdlrMovementBy(2))));

            var piece = getFirst<AgileObjects.BoardGameEngine.Pieces.Piece>(game.teams[0].getPieces());
            var piecePotentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, game);
            var numberOfInteractions = Object.keys(piecePotentialInteractions).length;

            expect(numberOfInteractions).toBe(4);

            var interactionLocations = new Array<string>();
            for (var interactionId in piecePotentialInteractions) {
                interactionLocations.push(piecePotentialInteractions[interactionId].location.coordinates.signature);
            }

            expect(interactionLocations.indexOf("2x1")).not.toBe(-1);
            expect(interactionLocations.indexOf("3x1")).not.toBe(-1);
            expect(interactionLocations.indexOf("1x2")).not.toBe(-1);
            expect(interactionLocations.indexOf("1x3")).not.toBe(-1);
        });

        it("Should move a piece one space to an empty tile", () => {
            var game: AgileObjects.BoardGameEngine.Games.Game = gameBuilder.createDefaultGame();
            var destinationTile = game.board.getTiles()["2x1"];

            expect(destinationTile).not.toBeNull();
            expect(destinationTile.isOccupied()).toBeFalsy();

            var piece = getFirst<AgileObjects.BoardGameEngine.Pieces.Piece>(game.teams[0].getPieces());
            var originTile = piece.location;

            expect(originTile).not.toBeNull();
            expect(originTile.coordinates.signature).toBe("1x1");
            expect(originTile.isOccupied()).toBeTruthy();

            var piecePotentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, game);

            expect(piecePotentialInteractions).not.toBeNull();

            var moveUpOneSpaceInteraction = Bge.Pieces.NullPotentialInteraction.INSTANCE;
            for (var interactionId in piecePotentialInteractions) {
                if (piecePotentialInteractions[interactionId].location.coordinates.signature === "2x1") {
                    moveUpOneSpaceInteraction = piecePotentialInteractions[interactionId];
                    break;
                }
            }

            expect(moveUpOneSpaceInteraction).not.toBe(Bge.Pieces.NullPotentialInteraction.INSTANCE);

            moveUpOneSpaceInteraction.complete();

            expect(piece.location).toBe(destinationTile);
            expect(destinationTile.isOccupied()).toBeTruthy();
            expect(originTile.isOccupied()).toBeFalsy();
        });

        function getFirst<T>(item: Object): T {
            for (var propertyName in item) {
                return <T>item[propertyName];
            }
            throw new Error("No properties available");
        }
    });
})