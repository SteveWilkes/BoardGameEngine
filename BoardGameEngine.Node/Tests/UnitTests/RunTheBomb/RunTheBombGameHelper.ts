require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

class RunTheBombGameHelper implements It.IGameHelper {
    public startDefaultGame(configurator: (gameWrapper: G.GameWrapper<G.RunTheBombTeamConfigurator>) => void):
        G.GameWrapper<G.RunTheBombTeamConfigurator> {

        var gameFactory = new Bge.Games.GameFactory(
            new Bge.Games.GetGameTypeQuery(
                new Bge.Games.GameTypeMapper(
                    new Bge.Boards.GetBoardTypeQuery(),
                    new Bge.Games.GameEntityAnnotationMapper(
                        new Bge.Games.GameEvaluatorPatternMapper()),
                    new Bge.Games.GameEvaluatorPatternMapper())));

        var game = gameFactory.createNewGame("rtb", "RunTheBomb");
        var gameWrapper = new Bge.Games.GameWrapper(new Bge.Games.RunTheBombTeamConfigurator(game), game);

        configurator(gameWrapper);

        game.start();

        return gameWrapper;
    }
}

var gameHelper = new RunTheBombGameHelper();

export = gameHelper;