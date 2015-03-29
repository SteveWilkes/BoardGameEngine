require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameBuilder: Ut.IGameBuilderService = require("./GameBuilder");

describe("Game", () => {
    describe("Pieces", () => {
        describe("Movement", () => {
            it("Should calculate an L-shape location path", () => {
                var game = gameBuilder.createDefaultGame();
                var tiles = game.board.getTiles();
                var bottomLeftTile = tiles["1x1"];

                var oneSpaceUp = new TsNs.CoordinateTranslator("up", 1);
                var twoSpacesRight = new TsNs.CoordinateTranslator("right", 2);
                var lShapeLocationCalculator = new Bge.Pieces.RelatedLocationCalculator([[oneSpaceUp, twoSpacesRight]], null, null);
                var lShapeFromBottomLeft = lShapeLocationCalculator.calculateLocationPaths(bottomLeftTile, tiles);

                expect(lShapeFromBottomLeft).not.toBeNull();
                expect(lShapeFromBottomLeft.length).toBe(3); // Arrays are returned for each path or sub-path
                expect(lShapeFromBottomLeft[2].length).toBe(4);
                expect(lShapeFromBottomLeft[2][0].coordinates.signature).toBe("1x1"); // starting point, then
                expect(lShapeFromBottomLeft[2][1].coordinates.signature).toBe("2x1"); // one space up, then
                expect(lShapeFromBottomLeft[2][2].coordinates.signature).toBe("2x2"); // one space right, then
                expect(lShapeFromBottomLeft[2][3].coordinates.signature).toBe("2x3"); // another space right
            });

            it("Should calculate up-down-left-right movement interactions", () => {
                var game = gameBuilder.createGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(2))));

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());
                var pieceInteractions = piece.getPotentialInteractions(game);

                var interactionLocations = TsNs.Joq
                    .select(pieceInteractions, (inter: IPieceInteraction) => inter.location.coordinates.signature)
                    .toArray();

                expect(interactionLocations.length).toBe(4);
                expect(interactionLocations.indexOf("2x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("3x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("1x2")).not.toBe(-1);
                expect(interactionLocations.indexOf("1x3")).not.toBe(-1);
            });

            it("Should calculate an infinite movement path", () => {
                var game = gameBuilder.createGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withASquareBoardOfSize(100)
                    .withNorthSouthBoardPositions()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1", "1x2"], pc => pc
                            .withUdlrInfiniteMovement()
                            .wherePathStepsMustBeUnoccupied()
                            .whereDestinationsMustBeUnoccupied())));

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());
                var pieceInteractions = piece.getPotentialInteractions(game);

                var interactionLocations = TsNs.Joq
                    .select(pieceInteractions, (inter: IPieceInteraction) => inter.location.coordinates.signature)
                    .toArray();

                expect(interactionLocations.length).toBe(99);
                expect(interactionLocations.indexOf("100x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("50x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("2x1")).not.toBe(-1);
            });

            it("Should exclude interactions based on an evaluator", () => {
                var game = gameBuilder.createGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(2)
                            .whereDestinationsMustBeUnoccupied()
                            .wherePieceMustBeOccupied())));

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());
                var pieceInteractions = piece.getPotentialInteractions(game);
                var numberOfInteractions = Object.keys(pieceInteractions).length;

                expect(numberOfInteractions).toBe(0);
            });

            it("Should exclude movement interactions with an invalid path step", () => {
                var game = gameBuilder.createGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1", "1x2", "1x3"], pc => pc
                            .withUdlrMovementBy(2)
                            .wherePathStepsMustBeUnoccupied())));

                var pieces = TsNs.Joq.toArray<Piece>(game.teams[0].getPieces());
                expect(pieces.length).toBe(3);

                var piece = pieces[0];
                var pieceInteractions = piece.getPotentialInteractions(game);

                var interactionLocations = TsNs.Joq
                    .select(pieceInteractions, (inter: IPieceInteraction) => inter.location.coordinates.signature)
                    .toArray();

                expect(interactionLocations.length).toBe(3);

                // We're using a step unoccupied validator and no destination validator, 
                // so only the move 1x1 -> 1x3 should be invalid:
                expect(interactionLocations.indexOf("2x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("3x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("1x2")).not.toBe(-1);
                expect(interactionLocations.indexOf("1x3")).toBe(-1);
            });

            it("Should exclude movement interactions with an invalid destination", () => {
                var game = gameBuilder.createGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1", "1x2", "1x3"], pc => pc
                            .withUdlrMovementBy(2)
                            .whereDestinationsMustBeUnoccupied())));

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());
                var pieceInteractions = piece.getPotentialInteractions(game);

                var interactionLocations = TsNs.Joq
                    .select(pieceInteractions, (inter: IPieceInteraction) => inter.location.coordinates.signature)
                    .toArray();

                expect(interactionLocations.length).toBe(2);
                expect(interactionLocations.indexOf("2x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("3x1")).not.toBe(-1);
                expect(interactionLocations.indexOf("1x2")).toBe(-1);
                expect(interactionLocations.indexOf("1x3")).toBe(-1);
            });

            it("Should move a piece to an empty tile", () => {
                var game = gameBuilder.startDefaultGame();
                var destinationTile = game.board.getTiles()["2x1"];

                expect(destinationTile).not.toBeNull();
                expect(destinationTile.isOccupied()).toBeFalsy();

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());
                var originTile = piece.location;

                expect(originTile).not.toBeNull();
                expect(originTile.coordinates.signature).toBe("1x1");
                expect(originTile.isOccupied()).toBeTruthy();

                var pieceInteractions = piece.getPotentialInteractions(game);

                expect(pieceInteractions).not.toBeNull();

                var moveUpOneSpaceInteraction = TsNs.Joq
                    .select<IPieceInteraction>(pieceInteractions)
                    .firstOrDefault(inter => inter.location.coordinates.signature === "2x1");

                expect(moveUpOneSpaceInteraction).not.toBeNull();

                moveUpOneSpaceInteraction.complete();

                expect(piece.location).toBe(destinationTile);
                expect(destinationTile.isOccupied()).toBeTruthy();
                expect(originTile.isOccupied()).toBeFalsy();
            });
        });
    });
});