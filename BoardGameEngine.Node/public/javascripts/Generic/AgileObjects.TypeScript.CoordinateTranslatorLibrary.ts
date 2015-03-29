module AgileObjects.TypeScript {

    export class CoordinateTranslatorLibrary {
        static SOUTH_TO_NORTH = (c: Coordinates, gridSize: number) =>
            CoordinatesLibrary.INSTANCE.get(gridSize - (c.row - 1), c.column);
    }
}