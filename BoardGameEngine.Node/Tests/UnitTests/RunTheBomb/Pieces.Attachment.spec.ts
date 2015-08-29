var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb",() => {
    describe("Pieces",() => {
        describe("Attachment",() => {
            it("Should attach the bomb to a human soldier", done =>
                gameHelper
                    .startDefaultGame(c => c
                    .forTeam(1)
                    .aBombAt("1x5")
                    .aSoldierAt("2x5"),
                    game => {
                        var team1Bomb = game.getPieceAt("1x5");
                        var team1Soldier = game.getPieceAt("2x5");

                        expect(team1Soldier.isOccupied()).toBeFalsy();

                        var attachmentInteraction = team1Bomb.getInteractionAt(team1Soldier);

                        attachmentInteraction.complete();

                        expect(team1Soldier.isOccupied()).toBeTruthy();
                        expect(team1Soldier.piece.id).toBe(team1Bomb.id);

                        done();
                    }));

            it("Should collect the bomb with a human soldier", done =>
                gameHelper
                    .startDefaultGame(c => c
                    .forTeam(1)
                    .aBombAt("1x5")
                    .aSoldierAt("2x5"),
                    game => {
                        var team1Soldier = game.getPieceAt("2x5");
                        var team1Bomb = game.getPieceAt("1x5");
                        var attachmentInteraction = team1Soldier.getInteractionAt(team1Bomb);

                        attachmentInteraction.complete();

                        expect(team1Soldier.isOccupied()).toBeTruthy();
                        expect(team1Bomb.location["id"]).toBe(team1Soldier.id);
                        expect(team1Soldier.location.coordinates.signature).toBe("1x5");

                        done();
                    }));

            it("Should pass the bomb from a human soldier to a ninja", done =>
                gameHelper
                    .startDefaultGame(c => c
                    .forTeam(1)
                    .aSoldierAt("2x5").withTheBomb()
                    .aNinjaAt("3x5"),
                    game => {
                        var team1Soldier = game.getPieceAt("2x5");

                        expect(team1Soldier.definitionId).toBe("2");
                        expect(team1Soldier.isOccupied()).toBeTruthy();

                        var team1Bomb = new Bge.Games.PieceWrapper(team1Soldier.piece);
                        expect(team1Bomb.definitionId).toBe("1");

                        // Move team1's bomb from the soldier to the ninja:
                        var team1Ninja = game.getPieceAt("3x5");
                        team1Bomb.getInteractionAt(team1Ninja).complete();

                        expect(team1Soldier.isOccupied()).toBeFalsy();
                        expect(team1Ninja.isOccupied()).toBeTruthy();
                        expect(team1Bomb.location["id"]).toBe(team1Ninja.id);

                        done();
                    }));
        });
    });
});