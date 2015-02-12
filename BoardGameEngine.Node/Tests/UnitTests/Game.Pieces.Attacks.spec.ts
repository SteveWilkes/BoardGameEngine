require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameBuilder: Ut.IGameBuilderService = require("./Game.GameBuilder");

var attack = InteractionType.attack;

describe("Game", () => {
    describe("Pieces", () => {
        describe("Attacks", () => {
            it("Should decrease an attacked Piece's health", () => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrAttackOver(2)))
                    .withATeamForPlayer(2, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrAttackOver(2))));

                expect(game.teams.length).toBe(2);

                var team1Pieces = TsNs.Joq.toArray<Piece>(game.teams[0].getPieces());
                expect(team1Pieces.length).toBe(1);
                var subjectPiece = team1Pieces[0];
                var subjectPieceInteractions = subjectPiece.interactionProfile.getPotentialInteractions(subjectPiece, game);

                var team2Pieces = TsNs.Joq.toArray<Piece>(game.teams[1].getPieces());
                expect(team2Pieces.length).toBe(1);
                var targetPiece = team2Pieces[0];
                var targetPiecePreAttackHealth = targetPiece.health;

                var attackInteraction = TsNs.Joq
                    .select<IPieceInteraction>(subjectPieceInteractions)
                    .firstOrDefault(inter => inter.location.coordinates.signature === "3x1");

                expect(attackInteraction).not.toBeNull();
                expect(attackInteraction.location.contains(targetPiece)).toBeTruthy();

                attackInteraction.complete();

                expect(targetPiece.health).toBeLessThan(targetPiecePreAttackHealth);
            });

            it("Should take a Piece by repeated health-decreasing attacks", () => {
                var numberOfAllowedAttacks = 100;
                var i;

                var lotsOfAttacks = new Array<InteractionType>(numberOfAllowedAttacks);
                for (i = 0; i < numberOfAllowedAttacks; i++) {
                    lotsOfAttacks[i] = attack;
                }

                var game = gameBuilder.startGame(gc => gc
                    .withTurnInteractions(lotsOfAttacks)
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrAttackOver(2)))
                    .withATeamForPlayer(2, tc => tc
                        .withAPieceAt(["1x1"], pc => pc
                            .withUdlrAttackOver(2))));

                expect(game.teams.length).toBe(2);

                var team1Pieces = TsNs.Joq.toArray<Piece>(game.teams[0].getPieces());
                var subjectPiece = team1Pieces[0];

                var team2Pieces = TsNs.Joq.toArray<Piece>(game.teams[1].getPieces());
                var targetPiece = team2Pieces[0];

                i = 0;

                while (true) {
                    var subjectPieceInteractions = subjectPiece.interactionProfile.getPotentialInteractions(subjectPiece, game);

                    var attackInteraction = TsNs.Joq
                        .select<IPieceInteraction>(subjectPieceInteractions)
                        .firstOrDefault(inter => inter.location.coordinates.signature === "3x1");

                    if (attackInteraction == null) { break; }

                    attackInteraction.complete();

                    if (targetPiece.hasBeenTaken()) { break; }

                    if (++i > numberOfAllowedAttacks) { break; }
                }

                expect(targetPiece.hasBeenTaken()).toBeTruthy();
            });
        });
    });
});