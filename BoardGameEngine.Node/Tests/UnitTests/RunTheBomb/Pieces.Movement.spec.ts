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

                var ninja = game1.getPieceAt("2x5");

                var canMoveUpOneSpace = ninja.hasInteractionAt("3x5");
                expect(canMoveUpOneSpace).toBeTruthy();

                var canMoveUpTwoSpaces = ninja.hasInteractionAt("4x5");
                expect(canMoveUpTwoSpaces).toBeTruthy();

                var game2 = gameHelper
                    .startDefaultGame(g => g
                    .setupPieces(c => c
                    .forTeam(1)
                    .aNinjaAt("1x5").withTheBomb()));

                ninja = game2.getPieceAt("1x5");

                canMoveUpOneSpace = ninja.hasInteractionAt("2x5");
                expect(canMoveUpOneSpace).toBeTruthy();

                canMoveUpTwoSpaces = ninja.hasInteractionAt("3x5");
                expect(canMoveUpTwoSpaces).toBeFalsy();
            });

            it("Should restrict Piece movement after an attack",() => {
                var game = gameHelper
                    .startDefaultGame(g => g
                    .setupPieces(c => c
                    .forTeam(1)
                    .aBombAt("1x5")
                    .soldiersAt("2x4", "2x5")
                    .forTeam(2)
                    .aBombAt("9x5")
                    .aSoldierAt("3x5")));

                var team1Soldier1 = game.getPieceAt("2x4");
                var team1Soldier2 = game.getPieceAt("2x5");
                var team2Soldier = game.getPieceAt("3x5");

                var team1Soldier1CanMove = team1Soldier1.hasInteractionAt("3x4");
                expect(team1Soldier1CanMove).toBeTruthy();

                var team1Soldier1CanAttack = team1Soldier1.hasInteractionAt(team2Soldier);
                expect(team1Soldier1CanAttack).toBeTruthy();

                var team1Soldier2CanMove = team1Soldier2.hasInteractionAt("3x4");
                expect(team1Soldier2CanMove).toBeTruthy();

                var team1Soldier2CanAttack = team1Soldier2.hasInteractionAt(team2Soldier);
                expect(team1Soldier2CanAttack).toBeTruthy();

                // Perform the attack:
                team1Soldier1.getInteractionAt(team2Soldier).complete();

                var team1Soldier1CanMove = team1Soldier1.hasInteractionAt("3x4");
                expect(team1Soldier1CanMove).toBeTruthy();

                var team1Soldier2CanMove = team1Soldier2.hasInteractionAt("3x4");
                expect(team1Soldier2CanMove).toBeFalsy();
            });
        });
    });
});