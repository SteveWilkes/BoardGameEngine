var gameBuilder: Ut.IGameBuilderService = require("./GameBuilder");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

describe("Game",() => {
    describe("Pieces",() => {
        describe("InteractionMonitor",() => {
            it("Should highlight a selected Piece",() => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                    .withAPieceAt(["1x1"], pc => pc
                    .withUdlrMovementBy(1))));

                var monitor = setupInteractionMonitor(game);

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());

                game.events.pieceSelected.publish(piece);

                expect(monitor.getHighlightedPiece()).toBe(piece);
            });
        });
    });
});

function setupInteractionMonitor(game: G.Game) {
    return new Bge.Pieces.PieceInteractionMonitor(
        (action: () => void, delay: number) => action(), game);
}