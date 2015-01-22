module AgileObjects.StrategyGame.Game.Players {

    export class LocalHumanPlayer extends PlayerBase implements IPlayer {
        constructor(id: string) {
            super(id, true);
        }
    }
}