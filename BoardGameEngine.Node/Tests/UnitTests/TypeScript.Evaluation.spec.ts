require("../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var TsNs = Ao.TypeScript;

describe("TypeScript", () => {
    describe("Evaluation", () => {
        it("Should evaluate a defined property to True", () => {
            var propertyName = "test";
            var item = {};
            item[propertyName] = "";

            var evaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, []);

            expect(evaluator.evaluate(item)).toBeTruthy();
        });

        it("Should evaluate an undefined property to False", () => {
            var evaluator = new TsNs.Evaluation.PropertyEvaluator("kjntkgjn", ["hello"]);

            expect(evaluator.evaluate({})).toBeFalsy();
        });

        it("Should evaluate a property value exact match", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var item = {};
            item[propertyName] = propertyValue;

            var evaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, [propertyValue]);

            expect(evaluator.evaluate(item)).toBeTruthy();
        });

        it("Should evaluate a property value array match", () => {
            var propertyName = "blah";
            var propertyValue = "abc";
            var item = {};
            item[propertyName] = propertyValue;

            var evaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, ["hello", propertyValue, "there"]);

            expect(evaluator.evaluate(item)).toBeTruthy();
        });

        it("Should evaluate a property value to False", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var item = {};
            item[propertyName] = propertyValue;

            var evaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, ["xyz"]);

            expect(evaluator.evaluate(item)).toBeFalsy();
        });

        it("Should evaluate a property value to a derived value", () => {
            var propertyName1 = "test1";
            var propertyName2 = "test2";
            var propertyValue = "iou";
            var item = {};
            item[propertyName1] = propertyValue;
            item[propertyName2] = propertyValue;

            var evaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName1, ["D:" + propertyName2]);

            expect(evaluator.evaluate(item)).toBeTruthy();
        });

        it("Should evaluate a method value to True", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var methodName = "getValue";
            var item = {};
            item[propertyName] = propertyValue;
            item[methodName] = function () { return this[propertyName] === propertyValue; }

            var evaluator = new TsNs.Evaluation.BooleanMethodEvaluator(methodName);

            expect(evaluator.evaluate(item)).toBeTruthy();
        });

        it("Should evaluate a method value to False", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var methodName = "getValue";
            var item = {};
            item[propertyName] = "jndlk";
            item[methodName] = function () { return this[propertyName] === propertyValue; }

            var evaluator = new TsNs.Evaluation.BooleanMethodEvaluator(methodName);

            expect(evaluator.evaluate(item)).toBeFalsy();
        });

        it("Should evaluate Anded Evaluators to True", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var methodName = "lalala";
            var item = {};
            item[propertyName] = propertyValue;
            item[methodName] = () => true;

            var propertyEvaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, [propertyValue]);
            var methodEvaluator = new TsNs.Evaluation.BooleanMethodEvaluator(methodName);
            var andedEvaluator = new TsNs.Evaluation.CompositeAndEvaluator([propertyEvaluator, methodEvaluator]);

            expect(andedEvaluator.evaluate(item)).toBeTruthy();
        });

        it("Should evaluate Anded Evaluators to False", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var methodName = "lalala";
            var item = {};
            item[propertyName] = propertyValue;
            item[methodName] = () => false;

            var propertyEvaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, ["987"]);
            var methodEvaluator = new TsNs.Evaluation.BooleanMethodEvaluator(methodName);
            var andedEvaluator = new TsNs.Evaluation.CompositeAndEvaluator([propertyEvaluator, methodEvaluator]);

            expect(andedEvaluator.evaluate(item)).toBeFalsy();
        });

        it("Should evaluate Ored Evaluators to True", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var methodName = "lalala";
            var item = {};
            item[propertyName] = propertyValue;
            item[methodName] = () => true;

            var propertyEvaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, ["dododo"]);
            var methodEvaluator = new TsNs.Evaluation.BooleanMethodEvaluator(methodName);
            var oredEvaluator = new TsNs.Evaluation.CompositeOrEvaluator([propertyEvaluator, methodEvaluator]);

            expect(oredEvaluator.evaluate(item)).toBeTruthy();
        });

        it("Should evaluate Ored Evaluators to False", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var methodName = "lalala";
            var item = {};
            item[propertyName] = propertyValue;
            item[methodName] = () => false;

            var propertyEvaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, ["dumdeedum"]);
            var methodEvaluator = new TsNs.Evaluation.BooleanMethodEvaluator(methodName);
            var oredEvaluator = new TsNs.Evaluation.CompositeOrEvaluator([propertyEvaluator, methodEvaluator]);

            expect(oredEvaluator.evaluate(item)).toBeFalsy();
        });

        it("Should evaluate a Negated Evaluator", () => {
            var propertyName = "test";
            var propertyValue = "123";
            var item = {};
            item[propertyName] = propertyValue;

            var evaluator = new TsNs.Evaluation.PropertyEvaluator(propertyName, [propertyValue]);
            var negatedEvaluator = new TsNs.Evaluation.NegationEvaluator(evaluator);

            expect(negatedEvaluator.evaluate(item)).toBeFalsy();
        });
    });
});