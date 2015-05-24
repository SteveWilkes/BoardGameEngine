var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb",() => {
    describe("Pieces",() => {
        describe("Movement",() => {
            it("Should restrict movement of a ninja with the bomb",() => {
                var game1 = gameHelper
                    .startDefaultGame(g => g
                    .setupPieces(c => c
                    .forTeam(1)
                    .aBombAt("1x5")
                    .aNinjaAt("2x5")));

                var team1Ninja = game1.getPieceAt("2x5");

                var canMoveUpOneSpace = team1Ninja.hasInteractionAt("3x5");
                expect(canMoveUpOneSpace).toBeTruthy();

                var canMoveUpTwoSpaces = team1Ninja.hasInteractionAt("4x5");
                expect(canMoveUpTwoSpaces).toBeTruthy();

                var game2 = gameHelper
                    .startDefaultGame(g => g
                    .setupPieces(c => c
                    .forTeam(1)
                    .aNinjaAt("1x5").withTheBomb()));

                team1Ninja = game2.getPieceAt("1x5");

                canMoveUpOneSpace = team1Ninja.hasInteractionAt("2x5");
                expect(canMoveUpOneSpace).toBeTruthy();

                canMoveUpTwoSpaces = team1Ninja.hasInteractionAt("3x5");
                expect(canMoveUpTwoSpaces).toBeFalsy();
            });
        });
    });
});