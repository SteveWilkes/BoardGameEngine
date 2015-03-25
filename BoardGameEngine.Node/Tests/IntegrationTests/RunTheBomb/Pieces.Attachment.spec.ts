require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameHelper: It.IGameHelper = require("./GameHelper");

describe("RunTheBomb", () => {
    describe("Pieces", () => {
        describe("Attachment", () => {
            it("Should attach the bomb to a human soldier", () => {
                var game = gameHelper.startDefaultGame();
                var team1Bomb = game.getPieceAt("1x5");
                var team1Soldier = game.getPieceAt("2x5");

                expect(team1Soldier.isOccupied()).toBeFalsy();

                var attachmentInteraction = game.getInteractionAt(team1Soldier, team1Bomb);

                attachmentInteraction.complete();

                expect(team1Soldier.isOccupied()).toBeTruthy();
                expect(team1Soldier.piece).toBe(team1Bomb);
            });

            it("Should collect the bomb with a human soldier", () => {
                var game = gameHelper.startDefaultGame();
                var team1Soldier = game.getPieceAt("2x5");
                var team1Bomb = game.getPieceAt("1x5");
                var attachmentInteraction = game.getInteractionAt(team1Bomb, team1Soldier);

                attachmentInteraction.complete();

                expect(team1Soldier.isOccupied()).toBeTruthy();
                expect(team1Bomb.location).toBe(team1Soldier);
                expect(team1Soldier.location.coordinates.signature).toBe("1x5");
            });

            it("Should pass the bomb from a human soldier to a ninja", () => {
                var game = gameHelper.startDefaultGame();
                var team1Bomb = game.getPieceAt("1x5");
                var team1Soldier = game.getPieceAt("2x5");

                // Move team1's bomb to the soldier at 2x5:
                game.getInteractionAt(team1Soldier, team1Bomb).complete();

                // End team1's turn:
                game.startNextTurn();

                // Move team2's bomb to 8x5:
                var team2Bomb = game.getPieceAt("9x5");
                game.getInteractionAt("8x5", team2Bomb).complete();

                // End team2's turn:
                game.startNextTurn();

                // Move team1's bomb from the soldier to a ninja:
                var team1Ninja = game.getPieceAt("3x5");
                game.getInteractionAt(team1Ninja, team1Bomb).complete();

                expect(team1Soldier.isOccupied()).toBeFalsy();
                expect(team1Ninja.isOccupied()).toBeTruthy();
                expect(team1Bomb.location).toBe(team1Ninja);
            });
        });
    });
});