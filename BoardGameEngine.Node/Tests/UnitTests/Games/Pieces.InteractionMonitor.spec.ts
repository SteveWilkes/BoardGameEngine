var gameBuilder: Ut.IGameBuilderService = require("./GameBuilder");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

describe("Game",() => {
    describe("Pieces",() => {
        describe("InteractionMonitor",() => {
            it("Should highlight a chosen Piece on mouse down",() => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                    .withAPieceAt(["1x1"], pc => pc
                    .withUdlrMovementBy(1))));

                var monitor = setupInteractionMonitor(game);

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());

                mouseDownOn(piece, game);

                expect(highlightedPiece(monitor)).toBe(piece);
            });

            it("Should show Potential Interactions for a chosen Piece on mouse down",() => {
                var game = gameBuilder.startGame(gc => gc
                    .withAttackThenMoveTurnInteractions()
                    .withA3x3NorthSouthBoard()
                    .withHumanLocalAndRemotePlayers()
                    .withATeamForPlayer(1, tc => tc
                    .withAPieceAt(["1x1"], pc => pc
                    .withUdlrMovementBy(1))));

                var monitor = setupInteractionMonitor(game);

                var piece = TsNs.Joq.first<Piece>(game.teams[0].getPieces());

                mouseDownOn(piece, game);

                var boardTiles = game.board.getTiles();
                var moveUpOneTile = boardTiles["2x1"].potentialInteractions();
                expect(moveUpOneTile.length).toBe(1);

                var moveRightOneTile = boardTiles["1x2"].potentialInteractions();
                expect(moveRightOneTile.length).toBe(1);
            });
        });
    });
});

function setupInteractionMonitor(game: G.Game) {
    var immediateTimeoutService = (action: () => void, delay: number) => action();
    immediateTimeoutService["cancel"] = () => { };

    return new Bge.Pieces.PieceInteractionMonitor(immediateTimeoutService, game);
}

function mouseDownOn(piece: Piece, game: G.Game) {
    game.events.pieceSelected.publish(piece);
}

function chosenPiece(monitor): Piece {
    return monitor._currentlyChosenPiece;
}

function highlightedPiece(monitor): Piece {
    return monitor._currentlyHighlightedPiece;
}