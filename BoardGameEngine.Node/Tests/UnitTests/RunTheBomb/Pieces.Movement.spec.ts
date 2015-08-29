var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb",() => {
    describe("Pieces",() => {
        describe("Movement",() => {
            it("Should restrict movement of a ninja with the bomb", done =>
                gameHelper.
                    startDefaultGame(c => c.
                    forTeam(1).
                    aBombAt("1x5").
                    aNinjaAt("2x5"),
                    game1 => {
                        var ninja = game1.getPieceAt("2x5");

                        var canMoveUpOneSpace = ninja.hasInteractionAt("3x5");
                        expect(canMoveUpOneSpace).toBeTruthy();

                        var canMoveUpTwoSpaces = ninja.hasInteractionAt("4x5");
                        expect(canMoveUpTwoSpaces).toBeTruthy();

                        gameHelper.
                            startDefaultGame(c => c.
                            forTeam(1).
                            aNinjaAt("1x5").withTheBomb(),
                            game2 => {
                                ninja = game2.getPieceAt("1x5");

                                canMoveUpOneSpace = ninja.hasInteractionAt("2x5");
                                expect(canMoveUpOneSpace).toBeTruthy();

                                canMoveUpTwoSpaces = ninja.hasInteractionAt("3x5");
                                expect(canMoveUpTwoSpaces).toBeFalsy();

                                done();
                            });
                    }));

            it("Should restrict Piece movement after an attack", done =>
                gameHelper.
                    startDefaultGame(c => c.
                    forTeam(1).
                    aBombAt("1x5").
                    soldiersAt("2x4", "2x5").
                    forTeam(2).
                    aBombAt("9x5").
                    aSoldierAt("3x5"),
                    game => {
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

                        done();
                    }));
        });
    });
});