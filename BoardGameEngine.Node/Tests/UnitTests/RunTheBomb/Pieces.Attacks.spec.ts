require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb",() => {
    describe("Pieces",() => {
        describe("Attacks",() => {
            it("Should leave the Bomb on the Board when a carrier is taken",() => {
                var game = gameHelper
                    .startDefaultGame()
                    .setupPieces(c => c
                    .forTeam(1)
                    .aSoldierAt("5x5")
                    .forTeam(2)
                    .aNinjaAt("5x6").withHealth(1).withTheBomb());

                var team1Soldier = game.getPieceAt("5x5");
                var team2Ninja = game.getPieceAt("5x6");

                expect(team2Ninja.health).toBe(1);

                var canAttackTeam2Ninja = game.hasInteractionAt(team2Ninja, team1Soldier);
                expect(canAttackTeam2Ninja).toBeTruthy();

                var team2NinjaTile = team2Ninja.location;
                var team2Bomb = team2Ninja.piece;

                game.getInteractionAt(team2Ninja, team1Soldier).complete();

                expect(team2Ninja.hasBeenTaken()).toBeTruthy();
                expect(team2Bomb.location).toBe(team2NinjaTile);
            });
        });
    });
});