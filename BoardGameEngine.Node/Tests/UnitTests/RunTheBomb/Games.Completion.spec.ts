var gameHelper: It.IGameHelper = require("./RunTheBombGameHelper");

describe("RunTheBomb",() => {
    describe("Games",() => {
        describe("Completion",() => {
            it("Should defeat a Team when a Bomb moves to a BombTile",() => {
                var game = gameHelper
                    .startDefaultGame(g => g
                    .setupPieces(c => c
                    .forTeam(1)
                    .aSoldierAt("8x5").withTheBomb()
                    .forTeam(2)
                    .aSoldierAt("8x4").withTheBomb()));

                var defeatedTeams = new Array<T.Team>();

                game.events.teamDefeated.subscribe(team => defeatedTeams.push(team) > 0);

                var team1Soldier = game.getPieceAt("8x5");
                
                // Move the Soldier (who has the Bomb) to 9x5 - the 
                // other team's BombTile
                team1Soldier.getInteractionAt("9x5").complete();
                
                expect(defeatedTeams.length).toBe(1);
                expect(defeatedTeams[0].id).not.toBe(team1Soldier.team.id);
                expect(game.teams[1].id).not.toBe(team1Soldier.team.id);
                expect(game.teams[0].id).toBe(team1Soldier.team.id);
                expect(defeatedTeams[0].id).toBe(game.teams[1].id);
            });
            
            it("Should complete a Game when only one Team is undefeated",() => {
                var game = gameHelper
                    .startDefaultGame(g => g
                    .setupPieces(c => c
                    .forTeam(1)
                    .aSoldierAt("3x5").withTheBomb()
                    .forTeam(2)
                    .aSoldierAt("2x5").withTheBomb()));

                var team2Soldier = game.getPieceAt("2x5");

                // Move the Soldier (who has the Bomb) to 1x5 - the 
                // other team's BombTile
                team2Soldier.getInteractionAt("1x5").complete();

                expect(game.status.isComplete()).toBeTruthy();
            });
        });
    });
});