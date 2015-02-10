require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var TsNs = Ao.TypeScript;

describe("TypeScript", () => {
    describe("Evaluation", () => {
        it("Should parse to a property evaluator", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var item = {};
            item[propertyName] = propertyValue;
            var pattern = "pv{" + propertyName + "," + propertyValue + "}";

            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);

            expect(evaluator.evaluate(item)).toBeTruthy();
        });
    });
});