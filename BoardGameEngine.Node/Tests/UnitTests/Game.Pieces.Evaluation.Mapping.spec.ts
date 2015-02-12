require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

describe("Game", () => {
    describe("Pieces", () => {
        describe("Evaluation", () => {
            describe("Mapping", () => {
                it("Should map isOccupied", () => {
                    var source = "io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("bme{isOccupied}");
                });

                it("Should map !isOccupied", () => {
                    var source = "!io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("!bme{isOccupied}");
                });

                it("Should map piece.isOccupied", () => {
                    var source = "p.io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("bme{piece.isOccupied}");
                });

                it("Should map location.isOccupied", () => {
                    var source = "l.io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("bme{location.isOccupied}");
                });

                it("Should map location.piece.isOccupied", () => {
                    var source = "l.p.io";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("bme{location.piece.isOccupied}");
                });

                it("Should map definitionId=1", () => {
                    var source = "d=1";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("pe{definitionId,[1]}");
                });

                it("Should map piece.definitionId=[1,2,3]", () => {
                    var source = "p.d=1,2,3";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("pe{piece.definitionId,[1,2,3]}");
                });

                it("Should map piece.team.id=10", () => {
                    var source = "p.t.id=10";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("pe{piece.team.id,[10]}");
                });

                it("Should map !location.piece.team.id=piece.team.id", () => {
                    var source = "!l.p.t.id=F:p.t.id";

                    var result = Bge.Pieces.Evaluation.PieceEvaluatorMapper.INSTANCE.map(source);

                    expect(result).toBe("!pe{location.piece.team.id,[F:piece.team.id]}");
                });
            });
        });
    });
});