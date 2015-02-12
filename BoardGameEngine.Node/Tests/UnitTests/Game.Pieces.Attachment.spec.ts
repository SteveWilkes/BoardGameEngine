require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameBuilder: Ut.IGameBuilderService = require("./Game.GameBuilder");

describe("Game", () => {
    describe("Pieces", () => {
        describe("Attachment", () => {
            it("Should exclude attachment targets by piece definition id", () => {
                var game = gameBuilder.createGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(1)
                            .withUdlrAttachmentTo(["3"]))
                        .withAPieceAt(["1x2"], pc => pc
                            .withUdlrMovementBy(1))
                        .withAPieceAt(["1x3"], pc => pc
                            .withUdlrMovementBy(1))));

                var pieces = TsNs.Joq.toArray<Piece>(game.teams[0].getPieces());
                expect(pieces.length).toBe(3);

                var piece = pieces[0];
                var pieceInteractions = piece.interactionProfile.getPotentialInteractions(piece, game);

                var attachmentInteraction = TsNs.Joq
                    .select<IPieceInteraction>(pieceInteractions)
                    .firstOrDefault(inter => inter.location.coordinates.signature === "1x2");

                // The piece at 1x1 can move to 1x2 but only attaches 
                // to the type of piece at 1x3, so there shouldn't be 
                // an attachment interaction:
                expect(attachmentInteraction).toBeNull();
            });

            it("Should attach one piece to another", () => {
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
                expect(pieces.length).toBe(2);

                var subjectPiece = pieces[0];
                var targetPiece = pieces[1];
                var startingLocation = subjectPiece.location;
                var pieceInteractions = subjectPiece.interactionProfile.getPotentialInteractions(subjectPiece, game);

                var attachmentInteraction = TsNs.Joq
                    .select<IPieceInteraction>(pieceInteractions)
                    .firstOrDefault(inter => inter.location.coordinates.signature === "1x2");

                expect(attachmentInteraction).not.toBeNull();

                attachmentInteraction.complete();

                expect(subjectPiece.location).toBe(targetPiece);
                expect(startingLocation.isOccupied()).toBeFalsy();
                expect(targetPiece.isOccupied()).toBeTruthy();
            });

            it("Should pass an attached piece from one piece to another", () => {
                var game = gameBuilder.startGame(gc => gc
                    .withTurnInteractions([InteractionType.move, InteractionType.move])
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrMovementBy(1)
                            .withUdlrAttachmentTo(["2"]))
                        .withAPieceAt(["2x1", "2x2"], pc => pc
                            .withUdlrMovementBy(1))));

                var pieces = TsNs.Joq.toArray<Piece>(game.teams[0].getPieces());

                var pieceInteractions, attachmentInteraction;

                var subjectPiece = pieces[0];
                var targetPiece1 = pieces[1];
                var targetPiece2 = pieces[2];

                pieceInteractions = subjectPiece.interactionProfile.getPotentialInteractions(subjectPiece, game);

                attachmentInteraction = TsNs.Joq
                    .select<IPieceInteraction>(pieceInteractions)
                    .firstOrDefault(inter => inter.location.coordinates.signature === "2x1");

                expect(attachmentInteraction.location.piece).toBe(targetPiece1);

                attachmentInteraction.complete();

                expect(subjectPiece.location).toBe(targetPiece1);

                pieceInteractions = subjectPiece.interactionProfile.getPotentialInteractions(subjectPiece, game);

                attachmentInteraction = TsNs.Joq
                    .select<IPieceInteraction>(pieceInteractions)
                    .firstOrDefault(inter => inter.location.coordinates.signature === "2x2");

                expect(attachmentInteraction.location.piece).toBe(targetPiece2);

                attachmentInteraction.complete();

                expect(subjectPiece.location).toBe(targetPiece2);
                expect(targetPiece2.isOccupied()).toBeTruthy();
                expect(targetPiece1.isOccupied()).toBeFalsy();
            });
        });
    });
});