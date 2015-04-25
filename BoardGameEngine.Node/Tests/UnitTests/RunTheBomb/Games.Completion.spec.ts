var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb",() => {
    describe("Games",() => {
        describe("Completion",() => {
            it("Should defeat a Team when a Bomb moves to a BombTile",() => {
                var game = gameHelper
                    .startDefaultGame()
                    .setupPieces(c => c
                    .forTeam(1)
                    .aSoldierAt("8x5").withTheBomb());

                var defeatedTeams = new Array<T.Team>();

                game.events.teamDefeated.subscribe(team => defeatedTeams.push(team) > 0);

                var team1Soldier = game.getPieceAt("8x5");

                // Move the Solider (who has the Bomb) to 9x5 - the 
                // other team's BombTile
                game.getInteractionAt("9x5", team1Soldier).complete();

                expect(defeatedTeams.length).toBe(1);
                expect(defeatedTeams[0]).not.toBe(team1Soldier.team);
                expect(defeatedTeams[0]).toBe(game.teams[game.teams.length - 1]);
            });

            it("Should complete a Game when only one Team is undefeated",() => {
                var game = gameHelper
                    .startDefaultGame()
                    .setupPieces(c => c
                    .forTeam(2)
                    .aSoldierAt("2x5").withTheBomb());

                var team1Soldier = game.getPieceAt("2x5");

                // Move the Solider (who has the Bomb) to 1x5 - the 
                // other team's BombTile
                game.getInteractionAt("1x5", team1Soldier).complete();

                expect(game.status.isComplete()).toBeTruthy();
            });
        });
    });
});