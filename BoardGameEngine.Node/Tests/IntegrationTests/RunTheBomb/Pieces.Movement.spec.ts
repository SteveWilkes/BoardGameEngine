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
                var team1Bomb = gameHelper.getPieceAt("1x5", game);
                var team1Soldier = gameHelper.getPieceAt("2x5", game);

                // Move team1's bomb to the soldier at 2x5:
                gameHelper.getInteractionAt(team1Soldier, team1Bomb, game).complete();

                // End team1's turn:
                gameHelper.startNextTurn(game);

                // Move team2's bomb to 8x5:
                var team2Bomb = gameHelper.getPieceAt("9x5", game);
                gameHelper.getInteractionAt("8x5", team2Bomb, game).complete();

                // End team2's turn:
                gameHelper.startNextTurn(game);

                // Move team1's bomb from the soldier to the ninja at 3x5:
                var team1Ninja = gameHelper.getPieceAt("3x5", game);
                gameHelper.getInteractionAt(team1Ninja, team1Bomb, game).complete();

                expect(team1Ninja.isOccupied()).toBeTruthy();

                // End team1's turn:
                gameHelper.startNextTurn(game);

                // Move team2's 8x4 soldier to 9x5:
                var team2Soldier = gameHelper.getPieceAt("8x4", game);
                gameHelper.getInteractionAt("9x5", team2Soldier, game).complete();

                // End team2's turn:
                gameHelper.startNextTurn(game);

                var canMoveUpOneSpace = gameHelper.hasInteractionAt("4x5", team1Ninja, game);
                expect(canMoveUpOneSpace).toBeTruthy();

                var canMoveUpTwoSpaces = gameHelper.hasInteractionAt("5x5", team1Ninja, game);
                expect(canMoveUpTwoSpaces).toBeFalsy();
            });
        });
    });
});