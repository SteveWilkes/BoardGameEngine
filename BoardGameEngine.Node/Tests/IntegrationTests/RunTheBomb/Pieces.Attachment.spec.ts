require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

describe("RunTheBomb", () => {
    describe("Pieces", () => {
        describe("Attachment", () => {
            it("Should attach the bomb to a human soldier", () => {
                var gameService = new Bge.Games.GameService(
                    new TsNs.RandomStringGenerator(),
                    new Bge.Games.GameFactory(
                        new Bge.Games.GetGameTypeQuery(
                            new Bge.Games.GameTypeMapper(
                                new Bge.Boards.GetBoardTypeQuery(),
                                new Bge.Games.GameEntityAnnotationMapper(
                                    new Bge.Games.GameEvaluatorPatternMapper()),
                                new Bge.Games.GameEvaluatorPatternMapper()))),
                    new Bge.Teams.TeamFactory());

                var game = gameService.createDefaultGame("1");
                game.start();

                var team1Pieces = game.teams[0].getPieces();

                var team1Bomb = TsNs.Joq
                    .select<Piece>(team1Pieces)
                    .first(p => p.location.coordinates.signature === "1x5");

                var team1Soldier = TsNs.Joq
                    .select<Piece>(team1Pieces)
                    .first(p => p.location.coordinates.signature === "2x5");

                var bombInteractions = team1Bomb.interactionProfile.getPotentialInteractions(team1Bomb, game);

                var attachmentInteraction = TsNs.Joq
                    .select<IPieceInteraction>(bombInteractions)
                    .firstOrDefault(inter => inter.location.contains(team1Soldier));

                expect(attachmentInteraction).not.toBeNull();
                expect(team1Soldier.isOccupied()).toBeFalsy();

                attachmentInteraction.complete();

                expect(team1Soldier.isOccupied()).toBeTruthy();
                expect(team1Soldier.piece).toBe(team1Bomb);
            });
        });
    });
});