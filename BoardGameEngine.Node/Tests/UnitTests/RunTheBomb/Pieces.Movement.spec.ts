require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameHelper: It.IGameHelper = require("./GameHelper");

describe("RunTheBomb", () => {
    describe("Pieces", () => {
        describe("Movement", () => {
            it("Should restrict movement of a ninja with the bomb", () => {
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

                // Move team1's bomb from the soldier to the ninja at 3x5:
                var team1Ninja = game.getPieceAt("3x5");
                game.getInteractionAt(team1Ninja, team1Bomb).complete();

                expect(team1Ninja.isOccupied()).toBeTruthy();

                // End team1's turn:
                game.startNextTurn();

                // Move team2's 8x4 soldier to 9x5:
                var team2Soldier = game.getPieceAt("8x4");
                game.getInteractionAt("9x5", team2Soldier).complete();

                // End team2's turn:
                game.startNextTurn();

                var canMoveUpOneSpace = game.hasInteractionAt("4x5", team1Ninja);
                expect(canMoveUpOneSpace).toBeTruthy();

                var canMoveUpTwoSpaces = game.hasInteractionAt("5x5", team1Ninja);
                expect(canMoveUpTwoSpaces).toBeFalsy();
            });
        });
    });
});