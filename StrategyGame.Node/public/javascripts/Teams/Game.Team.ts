module AgileObjects.StrategyGame.Game.Teams {
    import Pieces = StrategyGame.Game.Pieces;
    import Players = StrategyGame.Game.Players;

    export class Team {
        constructor(
            public name: string,
            public initialPieceLocations: Array<Pieces.PieceLocationConfig>,
            public player: Players.IPlayer) {
            // TODO: Add interface for player so the dependency goes Players -> Teams
            this.pieces = new Array<Pieces.IPiece>();

            for (var i = 0; i < initialPieceLocations.length; i++) {
                this.pieces.push(initialPieceLocations[i].piece);
            }
        }

        public pieces: Array<Pieces.IPiece>;

        public owns(piece: Pieces.IPiece): boolean {
            return this.pieces.indexOf(piece) > -1;
        }
    }
} 