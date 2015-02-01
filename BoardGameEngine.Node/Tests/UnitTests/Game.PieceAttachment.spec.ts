import Ut = AgileObjects.BoardGameEngine.Tests.UnitTests;

require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;
var gameBuilder: Ut.IGameBuilderService = require("./Game.GameBuilder");

describe("Game", () => {
    describe("Piece attachment", () => {

        it("Should attach one piece to another", () => {
            var game = gameBuilder.createGame(gc => gc
                .withA3x3NorthSouthBoard()
                .withHumanLocalAndRemotePlayers()
                .withATeamForPlayer(1, tc => tc
                    .withAPieceAt(["1x1"], pc => pc
                        .withUdlrMovementBy(1))
                    .withAPieceAt(["1x2"], pc => pc
                        .withUdlrAttachmentTo(["1"]))));
        });
    });
});