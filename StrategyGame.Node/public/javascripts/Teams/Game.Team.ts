module AgileObjects.StrategyGame.Game.Teams {
    import Pieces = StrategyGame.Game.Pieces;

    export class Team {
        private _pieces: Array<Pieces.IPiece>;

        constructor(
            public name: string,
            public startingFormation: TeamStartingFormation,
            public isLocal: boolean) {
            this._pieces = new Array<Pieces.IPiece>();

            for (var i = 0; i < startingFormation.tileConfigs.length; i++) {
                this._pieces.push(startingFormation.tileConfigs[i].piece);
            }
        }

        public owns(piece: Pieces.IPiece): boolean {
            return this._pieces.indexOf(piece) > -1;
        }
    }
} 