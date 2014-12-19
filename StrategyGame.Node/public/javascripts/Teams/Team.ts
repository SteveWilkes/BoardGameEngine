module AgileObjects.StrategyGame.Game.Teams {
    import Pieces = StrategyGame.Game.Pieces;

    export class Team {
        constructor(
            public name: string,
            public initialPieceLocations: Array<Pieces.PieceLocationConfig>,
            public owner: ITeamOwner) {
            
            this.pieces = new Array<Pieces.IPiece>();

            for (var i = 0; i < initialPieceLocations.length; i++) {
                this.pieces.push(initialPieceLocations[i].piece);
            }

            owner.add(this);
        }

        public pieces: Array<Pieces.IPiece>;

        public owns(piece: Pieces.IPiece): boolean {
            return this.pieces.indexOf(piece) > -1;
        }
    }
} 