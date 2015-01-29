module AgileObjects.TypeScript {

    export class CoordinateTranslatorRegistry {
        static SOUTH_TO_NORTH = (c: Coordinates, gridSize: number) =>
            CoordinatesRegistry.INSTANCE.get(gridSize - (c.row - 1), c.column);
    }
}