module AgileObjects.StrategyGame.Game.Pieces {

    export class AddDestinationPieceToPieceInteraction implements IPieceInteraction {
        constructor(public path: Array<IPieceLocation>) {
            this.location = this.path[this.path.length - 1];
        }

        public type = InteractionType.Move;
        public location: IPieceLocation;
        public isValid: boolean;

        public complete(): void {
            this.path[0].piece.add(this.location.piece);
            this.path[0].movePieceThrough(this.path);
        }

        static isValid = (path: Array<IPieceLocation>) => { return true; }
    }
}