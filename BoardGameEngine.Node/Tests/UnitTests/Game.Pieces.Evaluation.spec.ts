require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameBuilder: Ut.IGameBuilderService = require("./Game.GameBuilder");

describe("Game", () => {
    describe("Pieces", () => {
        describe("Evaluation", () => {
            it("Should evaluate a Piece definitionId exact match", () => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(1))));

                var subjectPiece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());

                expect(subjectPiece.definitionId).toBe("1");

                var evaluator = new Bge.Pieces.PropertyEvaluator<Piece>("definitionId", ["1"]);

                expect(evaluator.evaluate(subjectPiece)).toBeTruthy();
            });

            it("Should evaluate a Piece definitionId array match", () => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(1))));

                var subjectPiece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());
                var evaluator = new Bge.Pieces.PropertyEvaluator<Piece>("definitionId", ["0", "1", "2"]);

                expect(evaluator.evaluate(subjectPiece)).toBeTruthy();
            });


            it("Should evaluate a Piece definitionId mismatch", () => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(1))));

                var subjectPiece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());
                var evaluator = new Bge.Pieces.PropertyEvaluator<Piece>("definitionId", ["2", "4"]);

                expect(evaluator.evaluate(subjectPiece)).toBeFalsy();
            });

            it("Should evaluate a Piece as Unoccupied", () => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(1))));

                var subjectPiece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());

                expect(subjectPiece.isOccupied()).toBeFalsy();

                var evaluator = new Bge.Pieces.BooleanMethodEvaluator<Piece>("isOccupied");

                expect(evaluator.evaluate(subjectPiece)).toBeFalsy();
            });

            it("Should evaluate a Piece as Occupied", () => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(1)
                            .withUdlrAttachmentTo(["2"]))
                        .withAPieceAt(["1x2"], pc => pc
                            .withUdlrMovementBy(1))));

                var pieces = TsNs.Joq.toArray<Piece>(game.teams[0].getPieces());

                var subjectPiece = pieces[0];
                var targetPiece = pieces[1];
                var pieceInteractions = subjectPiece.interactionProfile.getPotentialInteractions(subjectPiece, game);

                TsNs.Joq
                    .select<IPieceInteraction>(pieceInteractions)
                    .first(inter => inter.location.coordinates.signature === "1x2")
                    .complete();

                expect(targetPiece.isOccupied()).toBeTruthy();
                expect(targetPiece.piece).toBe(subjectPiece);

                var evaluator = new Bge.Pieces.BooleanMethodEvaluator<Piece>("isOccupied");

                expect(evaluator.evaluate(targetPiece)).toBeTruthy();
            });
        });
    });
});