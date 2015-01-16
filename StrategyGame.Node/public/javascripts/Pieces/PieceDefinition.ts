module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _interactionProfileFactory: (events: GameEventSet) => PieceInteractionProfile) {
        }

        public createPiece(pieceId: string, events: GameEventSet): Piece {
            return new Piece(
                pieceId,
                this.id,
                this.imageSource,
                this._interactionProfileFactory(events));
        }
    }
}