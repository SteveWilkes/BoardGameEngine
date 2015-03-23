var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var TsNs = Ao.TypeScript;

describe("TypeScript", () => {
    describe("Joq", () => {

        it("Should return the first object property", () => {
            var subject = { hello: "Hello!" };
            var propertyValue = TsNs.Joq.first(subject);

            expect(propertyValue).toBe(subject.hello);
        });

        it("Should error on first() if an object has no properties", () => {
            var subject = {};
            var errorThrown = false;

            try {
                TsNs.Joq.first(subject);
            } catch (e) {
                errorThrown = true;
            }

            expect(errorThrown).toBeTruthy();
        });

        it("Should return a first object property for a value predicate", () => {
            var subject = { one: "Hello!", two: "There!" };
            var propertyValue = TsNs.Joq.first(subject, pv => pv == "There!");

            expect(propertyValue).toBe(subject.two);
        });

        it("Should return a first object property for a name predicate", () => {
            var subject = { one: "Hello!", two: "There!" };
            var propertyValue = TsNs.Joq.first(subject, (pv, pn) => pn == "two");

            expect(propertyValue).toBe(subject.two);
        });

        it("Should return a first array element", () => {
            var subject = ["BOOM"];
            var propertyValue = TsNs.Joq.first(subject);

            expect(propertyValue).toBe(subject[0]);
        });

        it("Should error on first() if an array has no elements", () => {
            var subject = [];
            var errorThrown = false;

            try {
                TsNs.Joq.first(subject);
            } catch (e) {
                errorThrown = true;
            }

            expect(errorThrown).toBeTruthy();
        });

        it("Should return the first array element for an item predicate", () => {
            var subject = ["BOOM", "TOWN"];
            var propertyValue = TsNs.Joq.first(subject, i => i == subject[1]);

            expect(propertyValue).toBe(subject[1]);
        });

        it("Should return the first array element for an index predicate", () => {
            var subject = ["BOOM", "TOWN"];
            var propertyValue = TsNs.Joq.first(subject, (i, idx) => idx == 1);

            expect(propertyValue).toBe(subject[1]);
        });

        it("Should project object property values to an array implicitly", () => {
            var subject = { one: 1, two: 2, three: 3 };
            var newArray = TsNs.Joq.select(subject).toArray();

            expect(newArray instanceof Array).toBeTruthy();
            expect(newArray[0]).toBe(1);
            expect(newArray[1]).toBe(2);
            expect(newArray[2]).toBe(3);
        });

        it("Should project object property values to an array explicitly", () => {
            var subject = { one: 1, two: 2, three: 3 };
            var newArray = TsNs.Joq.select(subject, pv => pv.toString()).toArray();

            expect(newArray[0]).toBe("1");
            expect(newArray[1]).toBe("2");
            expect(newArray[2]).toBe("3");
        });

        it("Should project object property names to an array", () => {
            var subject = { one: 1, two: 2, three: 3 };
            var newArray = TsNs.Joq.select(subject, (pv, pn) => pn).toArray();

            expect(newArray[0]).toBe("one");
            expect(newArray[1]).toBe("two");
            expect(newArray[2]).toBe("three");
        });

        it("Should project array elements to a new array", () => {
            var subject = ["1", "2", "3"];
            var newArray = TsNs.Joq.select(subject, i => parseInt(i)).toArray();

            expect(newArray).not.toBe(subject);
            expect(newArray[0]).toBe(1);
            expect(newArray[1]).toBe(2);
            expect(newArray[2]).toBe(3);
        });

        it("Should filter object property values to an array", () => {
            var subject = { one: 1, two: 2, three: 3 };
            var newArray = TsNs.Joq.select<number>(subject).where(pv => pv > 2).toArray();

            expect(newArray.length).toBe(1);
            expect(newArray[0]).toBe(3);
        });

        it("Should filter array elements to a new array", () => {
            var subject = [1, 2, 3];
            var newArray = TsNs.Joq.select(subject, i => i).where(pv => pv <= 2).toArray();

            expect(newArray.length).toBe(2);
            expect(newArray[0]).toBe(1);
            expect(newArray[1]).toBe(2);
        });

        it("Should return the firstOrDefault object property", () => {
            var subject = { one: 1 };
            var result = TsNs.Joq.select(subject).firstOrDefault();

            expect(result).toBe(1);
        });

        it("Should return null on firstOrDefault if an object has no properties", () => {
            var subject = {};
            var result = TsNs.Joq.select(subject).firstOrDefault();

            expect(result).toBeNull();
        });

        it("Should return a default value on firstOrDefault if an object has no properties", () => {
            var subject = {};
            var result = TsNs.Joq.select(subject).firstOrDefault("100");

            expect(result).toBe("100");
        });

        it("Should return the firstOrDefault object property for a value predicate", () => {
            var subject = { one: 1, two: 2, three: 3 };
            var result = TsNs.Joq.select(subject).firstOrDefault(pv => pv == 2);

            expect(result).toBe(2);
        });

        it("Should return the firstOrDefault object property for a name predicate", () => {
            var subject = { one: 1, two: 2, three: 3 };
            var result = TsNs.Joq.select(subject).firstOrDefault((pv, pn) => pn === "three");

            expect(result).toBe(3);
        });

        it("Should return the firstOrDefault array element", () => {
            var subject = [10];
            var result = TsNs.Joq.select(subject).firstOrDefault();

            expect(result).toBe(subject[0]);
        });

        it("Should return null on firstOrDefault if an array has no elements", () => {
            var subject = [];
            var result = TsNs.Joq.select(subject).firstOrDefault();

            expect(result).toBeNull();
        });

        it("Should return a default value on firstOrDefault if an array has no elements", () => {
            var subject = [];
            var result = TsNs.Joq.select(subject, i => i).firstOrDefault(10);

            expect(result).toBe(10);
        });

        it("Should return the firstOrDefault array element for an item predicate", () => {
            var subject = ["one", "two", "three"];
            var result = TsNs.Joq.select(subject, i => i).firstOrDefault(i => i == "three");

            expect(result).toBe("three");
        });

        it("Should return null on firstOrDefault if an array has no elements for an item predicate", () => {
            var subject = ["one", "two", "three"];
            var result = TsNs.Joq.select(subject, i => i).firstOrDefault(i => i == "four");

            expect(result).toBeNull();
        });

        it("Should return the firstOrDefault array element for an index predicate", () => {
            var subject = ["one", "two", "three"];
            var result = TsNs.Joq.select(subject, i => i).firstOrDefault((i, idx) => idx == 1);

            expect(result).toBe("two");
        });

        it("Should return null on firstOrDefault if an array has no elements for an index predicate", () => {
            var subject = ["one", "two", "three"];
            var result = TsNs.Joq.select(subject, i => i).firstOrDefault((i, idx) => idx < 0);

            expect(result).toBeNull();
        });
    });
});