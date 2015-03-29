require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb", () => {
    describe("Pieces", () => {
        describe("Attachment", () => {
            it("Should attach the bomb to a human soldier", () => {
                var game = gameHelper
                    .startDefaultGame()
                    .setupPieces(c => c
                        .forTeam(1)
                        .aBombAt("1x5")
                        .aSoldierAt("2x5"));

                var team1Bomb = game.getPieceAt("1x5");
                var team1Soldier = game.getPieceAt("2x5");

                expect(team1Soldier.isOccupied()).toBeFalsy();

                var attachmentInteraction = game.getInteractionAt(team1Soldier, team1Bomb);

                attachmentInteraction.complete();

                expect(team1Soldier.isOccupied()).toBeTruthy();
                expect(team1Soldier.piece).toBe(team1Bomb);
            });

            it("Should collect the bomb with a human soldier", () => {
                var game = gameHelper
                    .startDefaultGame()
                    .setupPieces(c => c
                        .forTeam(1)
                        .aBombAt("1x5")
                        .aSoldierAt("2x5"));

                var team1Soldier = game.getPieceAt("2x5");
                var team1Bomb = game.getPieceAt("1x5");
                var attachmentInteraction = game.getInteractionAt(team1Bomb, team1Soldier);

                attachmentInteraction.complete();

                expect(team1Soldier.isOccupied()).toBeTruthy();
                expect(team1Bomb.location).toBe(team1Soldier);
                expect(team1Soldier.location.coordinates.signature).toBe("1x5");
            });

            it("Should pass the bomb from a human soldier to a ninja", () => {
                var game = gameHelper
                    .startDefaultGame()
                    .setupPieces(c => c
                        .forTeam(1)
                        .aSoldierAt("2x5").withTheBomb()
                        .aNinjaAt("3x5"));

                var team1Soldier = game.getPieceAt("2x5");

                expect(team1Soldier.definitionId).toBe("2");
                expect(team1Soldier.isOccupied()).toBeTruthy();

                var team1Bomb = team1Soldier.piece;
                expect(team1Bomb.definitionId).toBe("1");

                // Move team1's bomb from the soldier to the ninja:
                var team1Ninja = game.getPieceAt("3x5");
                game.getInteractionAt(team1Ninja, team1Bomb).complete();

                expect(team1Soldier.isOccupied()).toBeFalsy();
                expect(team1Ninja.isOccupied()).toBeTruthy();
                expect(team1Bomb.location).toBe(team1Ninja);
            });
        });
    });
});