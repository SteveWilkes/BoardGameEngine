require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

describe("Game", () => {
    describe("Pieces", () => {
        describe("Evaluation", () => {
            describe("Mapping", () => {
                it("Should map Piece.isOccupied", () => {
                    var source = "p.io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("bme(isOccupied)");
                });

                it("Should map !Piece.isOccupied", () => {
                    var source = "!p.io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("!bme(isOccupied)");
                });

                it("Should map Piece.piece.isOccupied", () => {
                    var source = "p.p.io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("bme(piece.isOccupied)");
                });

                it("Should map Piece.definitionId", () => {
                    var source = "p.d=1";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("pe(definitionId,[1])");
                });

                it("Should map Piece.piece.definitionId", () => {
                    var source = "p.p.d=1,2,3";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("pe(piece.definitionId,[1,2,3])");
                });
            });
        });
    });
});