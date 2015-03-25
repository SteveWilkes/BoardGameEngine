﻿require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

class GameHelper implements It.IGameHelper {
    public startDefaultGame(): G.GameWrapper {
        var gameService = new Bge.Games.GameService(
            new TsNs.RandomStringGenerator(),
            new Bge.Games.GameFactory(
                new Bge.Games.GetGameTypeQuery(
                    new Bge.Games.GameTypeMapper(
                        new Bge.Boards.GetBoardTypeQuery(),
                        new Bge.Games.GameEntityAnnotationMapper(
                            new Bge.Games.GameEvaluatorPatternMapper()),
                        new Bge.Games.GameEvaluatorPatternMapper()))),
            new Bge.Teams.TeamFactory());

        var game = gameService.createDefaultGame("1");
        game.start();

        return new Bge.Games.GameWrapper(game);
    }
}

var gameHelper = new GameHelper();

export = gameHelper;