module AgileObjects.StrategyGame.Game.Players {

    export interface IPlayer {
        id: string;
        isLocal: boolean;
        takeTurn(): void;
    }

    export class AiPlayer implements IPlayer {
        constructor(public id: string) {
            this.isLocal = false;
        }

        public isLocal: boolean;

        public takeTurn(): void {

            
        }
    }

    export class HumanPlayer implements IPlayer {
        constructor(public id: string, public isLocal: boolean) { }

        public takeTurn(): void { }
    }
}