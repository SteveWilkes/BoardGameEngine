module AgileObjects.StrategyGame.Game.Status {

    export class PieceAttackAction implements IGameAction {
        constructor(attack: Pieces.PieceAttack) {
            this.description =
            attack.attacker.coordinates.signature + " attacks " +
            attack.target.coordinates.signature + " for " +
            attack.damage + " damage";

            if (attack.target.hasBeenTaken()) {
                this.description += " - " + attack.target.coordinates.signature + " taken!";
            }
        }

        public description: string;
    }
}