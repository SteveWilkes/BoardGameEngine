module AgileObjects.StrategyGame.Game {

    export interface IPieceMovementProfile {
        getPossibleDestinations(origin: Coordinates): Array<Coordinates>;
    }
}