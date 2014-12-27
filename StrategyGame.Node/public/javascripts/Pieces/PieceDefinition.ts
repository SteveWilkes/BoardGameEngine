module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _interactionProfile: PieceInteractionProfile) {
        }

        public createPiece(pieceId: string, events: EventSet): Piece {
            return new Piece(
                pieceId,
                this.id,
                this.imageSource,
                this._interactionProfile,
                events);
        }
    }
}