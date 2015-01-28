module AgileObjects.BoardGameEngine.Pieces {

    export class PieceAttack implements IGameAction {
        constructor(
            public interactionId: string,
            public attacker: Piece,
            public target: Piece,
            public damage: number) {

            this.piece = this.attacker;

            this.description =
            this.attacker.coordinates.signature + " attacks " +
            this.target.coordinates.signature + " for " +
            this.damage + " damage";

            if (this.target.hasBeenTaken()) {
                this.description += " - " + this.target.coordinates.signature + " taken!";
            }
        }

        public piece: Piece;
        public description: string;
    }
}
