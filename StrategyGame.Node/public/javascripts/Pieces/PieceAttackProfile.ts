module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceAttackProfile {
        constructor(private _attacks: Array<PieceAttack>) { }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            for (var i = 0; i < this._attacks.length; i++) {
                this._attacks[i].setLocations(allLocations);
            }
        }

        public getTargetsByAttack(currentLocation: IPieceLocation): TypeScript.Dictionary<PieceAttack, Array<IPieceLocation>> {
            var availableTargetsByAttack = new TypeScript.Dictionary<PieceAttack, Array<IPieceLocation>>();
            for (var i = 0; i < this._attacks.length; i++) {
                var attack = this._attacks[i];
                var attackTargets = attack.getTargetLocations(currentLocation);
                if (attackTargets.length > 0) {
                    availableTargetsByAttack.add(attack, attackTargets);
                }
            }
            return availableTargetsByAttack;
        }
    }
}