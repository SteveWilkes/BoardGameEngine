require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var TsNs = Ao.TypeScript;

describe("TypeScript", () => {
    describe("Evaluation", () => {
        it("Should parse a PropertyEvaluator with a single option", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var item = {};
            item[propertyName] = propertyValue;

            var pattern = "pe{" + propertyName + ",[" + propertyValue + "]}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);
            var result = evaluator.evaluate(item);

            expect(result).toBeTruthy();
        });

        it("Should parse a PropertyEvaluator with multiple options", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var item = {};
            item[propertyName] = propertyValue;

            var pattern = "pe{" + propertyName + ",[hello," + propertyValue + ",lalala]}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);
            var result = evaluator.evaluate(item);

            expect(result).toBeTruthy();
        });

        it("Should parse a BooleanMethodEvaluator", () => {
            var methodName = "getValue";
            var item = {};
            item[methodName] = () => true;

            var pattern = "bme{" + methodName + "}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);
            var result = evaluator.evaluate(item);

            expect(result).toBeTruthy();
        });

        it("Should parse a CompositeAndEvaluator", () => {
            var propertyName = "test";
            var propertyValue = "abc";
            var methodName = "getValue";
            var item = {};
            item[propertyName] = propertyValue;
            item[methodName] = () => true;

            var pattern = "pe{" + propertyName + ",[" + propertyValue + "]}+bme{" + methodName + "}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);
            var result = evaluator.evaluate(item);

            expect(result).toBeTruthy();
        });

        it("Should parse a CompositeOrEvaluator", () => {
            var propertyName = "test";
            var propertyValue = "abc";
            var methodName = "getValue";
            var item = {};
            item[propertyName] = propertyValue;
            item[methodName] = () => false;

            var pattern = "bme{" + methodName + "}|pe{" + propertyName + ",[" + propertyValue + "]}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);
            var result = evaluator.evaluate(item);

            expect(result).toBeTruthy();
        });
    });
});