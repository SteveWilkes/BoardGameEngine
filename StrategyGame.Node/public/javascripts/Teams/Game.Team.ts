module AgileObjects.StrategyGame.Game {

    export class Team {
        private _pieces: Array<IPiece>;

        constructor(
            public name: string,
            public startingFormation: TeamStartingFormation,
            public isLocal: boolean) {
            this._pieces = new Array<IPiece>();

            for (var i = 0; i < startingFormation.tileConfigs.length; i++) {
                this._pieces.push(startingFormation.tileConfigs[i].piece);
            }
        }

        public owns(piece: IPiece): boolean {
            return this._pieces.indexOf(piece) > -1;
        }
    }
} 