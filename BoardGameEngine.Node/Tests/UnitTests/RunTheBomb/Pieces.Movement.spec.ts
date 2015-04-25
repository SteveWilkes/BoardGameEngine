var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb", () => {
    describe("Pieces", () => {
        describe("Movement", () => {
            it("Should restrict movement of a ninja with the bomb", () => {
                var game = gameHelper
                    .startDefaultGame()
                    .setupPieces(c => c
                        .forTeam(1)
                        .aBombAt("1x5")
                        .aNinjaAt("2x5"));

                var team1Ninja = game.getPieceAt("2x5");

                var canMoveUpOneSpace = game.hasInteractionAt("3x5", team1Ninja);
                expect(canMoveUpOneSpace).toBeTruthy();

                var canMoveUpTwoSpaces = game.hasInteractionAt("4x5", team1Ninja);
                expect(canMoveUpTwoSpaces).toBeTruthy();

                var team1Bomb = game.getPieceAt("1x5");

                // Move team1's bomb to the ninja at 2x5:
                game.getInteractionAt(team1Ninja, team1Bomb).complete();

                canMoveUpOneSpace = game.hasInteractionAt("3x5", team1Ninja);
                expect(canMoveUpOneSpace).toBeTruthy();

                canMoveUpTwoSpaces = game.hasInteractionAt("4x5", team1Ninja);
                expect(canMoveUpTwoSpaces).toBeFalsy();
            });
        });
    });
});