require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameHelper: It.IGameHelper = require("./GameHelper");

describe("RunTheBomb", () => {
    describe("Pieces", () => {
        describe("Attachment", () => {
            it("Should attach the bomb to a human soldier", () => {
                var game = gameHelper.startDefaultGame();
                var team1Bomb = gameHelper.getPieceAt("1x5", game);
                var team1Soldier = gameHelper.getPieceAt("2x5", game);

                expect(team1Soldier.isOccupied()).toBeFalsy();

                var attachmentInteraction = gameHelper.getInteractionAt(team1Soldier, team1Bomb, game);

                attachmentInteraction.complete();

                expect(team1Soldier.isOccupied()).toBeTruthy();
                expect(team1Soldier.piece).toBe(team1Bomb);
            });
        });
    });
});