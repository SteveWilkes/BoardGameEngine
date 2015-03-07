require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var TsNs = Ao.TypeScript;

describe("TypeScript", () => {
    describe("Evaluation", () => {
        it("Should parse a PropertyEvaluator with zero options", () => {
            var propertyName = "lalala";
            var item = {};
            item[propertyName] = "";

            var pattern = "pe{" + propertyName + ",[]}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);
            var result = evaluator.evaluate(item);

            expect(result).toBeTruthy();
        });

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

        it("Should parse a nested PropertyEvaluator", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var item = {};
            item[propertyName] = {};
            item[propertyName][propertyName] = propertyValue;

            var pattern = "pe{" + propertyName + "." + propertyName + ",[" + propertyValue + "]}";
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

        it("Should parse a negated BooleanMethodEvaluator", () => {
            var methodName = "getValue";
            var item = {};
            item[methodName] = () => true;

            var pattern = "!bme{" + methodName + "}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);
            var result = evaluator.evaluate(item);

            expect(result).toBeFalsy();
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

        it("Should parse a negated Evaluator in a CompositeAndEvaluator", () => {
            var propertyName = "test";
            var propertyValue = "abc";
            var methodName = "getValue";
            var item = {};

            var pattern = "!bme{" + methodName + "}+pe{" + propertyName + ",[" + propertyValue + "]}";
            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);

            item[propertyName] = "ijefnj";
            item[methodName] = () => true;
            expect(evaluator.evaluate(item)).toBeFalsy();

            item[propertyName] = propertyValue;
            expect(evaluator.evaluate(item)).toBeFalsy();

            item[methodName] = () => false;
            expect(evaluator.evaluate(item)).toBeTruthy();
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

        it("Should parse a grouped CompositeAndEvaluator", () => {
            var propertyName = "test";
            var propertyValue1 = "abc";
            var propertyValue2 = "xyz";
            var methodName = "getValue";
            var item = {};
            item[methodName] = () => true;

            var pattern =
                "(pe{" + propertyName + ",[" + propertyValue1 + "]}+bme{" + methodName + "})" +
                "|" +
                "pe{" + propertyName + ",[" + propertyValue2 + "]}";

            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);

            item[propertyName] = propertyValue1;
            expect(evaluator.evaluate(item)).toBeTruthy();

            item[propertyName] = propertyValue2;
            expect(evaluator.evaluate(item)).toBeTruthy();

            item[propertyName] = "hjdfkbj";
            expect(evaluator.evaluate(item)).toBeFalsy();
        });

        it("Should parse a grouped CompositeOrEvaluator", () => {
            var propertyName = "test";
            var propertyValue1 = "abc";
            var propertyValue2 = "xyz";
            var methodName = "getValue";
            var item = {};

            var pattern =
                "pe{" + propertyName + ",[" + propertyValue1 + "]}+" +
                "(bme{" + methodName + "}|pe{" + propertyName + ",[" + propertyValue2 + "]})";

            var evaluator = TsNs.Evaluation.EvaluatorParser.INSTANCE.parse(pattern);

            item[propertyName] = propertyValue1;
            item[methodName] = () => true;
            expect(evaluator.evaluate(item)).toBeTruthy();

            item[methodName] = () => false;
            expect(evaluator.evaluate(item)).toBeFalsy();

            item[propertyName] = propertyValue2;
            expect(evaluator.evaluate(item)).toBeFalsy();
        });
    });
});