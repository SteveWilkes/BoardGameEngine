require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb",() => {
    describe("Pieces",() => {
        describe("Attacks",() => {
            it("Should only allow one attack per move", done =>
                gameHelper.
                    startDefaultGame(c => c.
                    forTeam(1).
                    aBombAt("1x5").
                    soldiersAt("2x4", "2x5").
                    forTeam(2).
                    aBombAt("9x5").
                    aSoldierAt("3x4"),
                    game => {
                        var team1Soldier1 = game.getPieceAt("2x4");
                        var team1Soldier2 = game.getPieceAt("2x5");
                        var team2Soldier = game.getPieceAt("3x4");

                        var team1Soldier1CanAttack = team1Soldier1.hasInteractionAt(team2Soldier);
                        expect(team1Soldier1CanAttack).toBeTruthy();

                        var team1Soldier2CanAttack = team1Soldier2.hasInteractionAt(team2Soldier);
                        expect(team1Soldier2CanAttack).toBeTruthy();

                        // Perform the attack:
                        team1Soldier2.getInteractionAt(team2Soldier).complete();

                        var team1Soldier1CanAttack = team1Soldier1.hasInteractionAt(team2Soldier);
                        expect(team1Soldier1CanAttack).toBeFalsy();

                        var team1Soldier2CanAttack = team1Soldier2.hasInteractionAt(team2Soldier);
                        expect(team1Soldier2CanAttack).toBeFalsy();

                        done();
                    }));

            it("Should leave the Bomb on the Board when a carrier is taken", done =>
                gameHelper.
                    startDefaultGame(c => c.
                    forTeam(1).
                    aSoldierAt("5x5").
                    forTeam(2).
                    aNinjaAt("5x6").withHealth(1).withTheBomb(),
                    game => {
                        var team1Soldier = game.getPieceAt("5x5");
                        var team2Ninja = game.getPieceAt("5x6");

                        expect(team2Ninja.health).toBe(1);

                        var canAttackTeam2Ninja = team1Soldier.hasInteractionAt(team2Ninja);
                        expect(canAttackTeam2Ninja).toBeTruthy();

                        var team2NinjaTile = team2Ninja.location;
                        var team2Bomb = team2Ninja.piece;

                        team1Soldier.getInteractionAt(team2Ninja).complete();

                        expect(team2Ninja.hasBeenTaken()).toBeTruthy();
                        expect(team2Bomb.location).toBe(team2NinjaTile);

                        done();
                    }));
        });
    });
});