require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

class RunTheBombGameHelper implements It.IGameHelper {
    public startDefaultGame(
        configuration: (configurator: G.RunTheBombTeamConfigurator) => void,
        callback: (gw: G.GameWrapper<G.RunTheBombTeamConfigurator>) => void): void {

        var gameFactory = new Bge.Games.GameFactory(
            new Bge.Games.GetGameTypeQuery(
                new Bge.Games.GameTypeMapper(
                    new Bge.Boards.GetBoardTypeQuery(),
                    new Bge.Games.GameEntityAnnotationMapper(
                        new Bge.Games.GameEvaluatorPatternMapper()),
                    new Bge.Games.GameEvaluatorPatternMapper())));

        var gameWrapper = new Bge.Games.GameWrapper(gameFactory, new Bge.Games.RunTheBombTeamConfigurator());

        gameWrapper.setupPieces(configuration, gw => {
            gw.start();
            callback(gw);
        });
    }
}

var gameHelper = new RunTheBombGameHelper();

export = gameHelper;