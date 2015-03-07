var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var TsNs = Ao.TypeScript;

describe("TypeScript", () => {
    describe("Coordinates", () => {

        it("Should calculate a straight coordinate path", () => {
            var rowOneColumnOne = new TsNs.Coordinates(1, 1);

            var twoSpacesUp = new TsNs.CoordinateTranslator("up", 2);
            var twoSpacesUpFromBottomLeft = twoSpacesUp.getPath(rowOneColumnOne);

            expect(twoSpacesUpFromBottomLeft).not.toBeNull();
            expect(twoSpacesUpFromBottomLeft.length).toBe(2);
            expect(twoSpacesUpFromBottomLeft[0]).not.toBe(rowOneColumnOne);
            expect(twoSpacesUpFromBottomLeft[0].signature).toBe("2x1");
            expect(twoSpacesUpFromBottomLeft[1].signature).toBe("3x1");
        });

        it("Should retrieve singleton coordinates from the registry", () => {
            var rowTwoColumnTwo = TsNs.CoordinatesRegistry.INSTANCE.get(2, 2);

            expect(rowTwoColumnTwo).not.toBeNull();
            expect(rowTwoColumnTwo.row).toBe(2);
            expect(rowTwoColumnTwo.column).toBe(2);

            var rowTwoColumnTwoAgain = TsNs.CoordinatesRegistry.INSTANCE.get(2, 2);

            expect(rowTwoColumnTwoAgain).toBe(rowTwoColumnTwo);
        });
    });
});