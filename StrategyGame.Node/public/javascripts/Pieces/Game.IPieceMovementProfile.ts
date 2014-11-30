module AgileObjects.StrategyGame.Game {

    export interface IPieceMovementProfile {
        getValidDestinations(origin: IPieceLocation, allLocations: IPieceLocationDictionary): Array<IPieceLocation>;
    }
}