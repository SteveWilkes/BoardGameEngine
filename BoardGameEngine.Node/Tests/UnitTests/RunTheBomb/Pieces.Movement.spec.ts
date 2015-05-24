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

                var canMoveUpOneSpace = game1.hasInteractionAt("3x5", team1Ninja);
                expect(canMoveUpOneSpace).toBeTruthy();

                var canMoveUpTwoSpaces = game1.hasInteractionAt("4x5", team1Ninja);
                expect(canMoveUpTwoSpaces).toBeTruthy();

                var game2 = gameHelper
                    .startDefaultGame(g => g
                    .setupPieces(c => c
                    .forTeam(1)
                    .aNinjaAt("1x5").withTheBomb()));

                team1Ninja = game2.getPieceAt("1x5");

                canMoveUpOneSpace = game2.hasInteractionAt("2x5", team1Ninja);
                expect(canMoveUpOneSpace).toBeTruthy();

                canMoveUpTwoSpaces = game2.hasInteractionAt("3x5", team1Ninja);
                expect(canMoveUpTwoSpaces).toBeFalsy();
            });
        });
    });
});