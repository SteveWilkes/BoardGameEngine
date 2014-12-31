module AgileObjects.StrategyGame.Game.Status {

    export class TurnDefinition implements Pieces.IPieceInteractionRegulator {
        constructor(private _turnInteractions: Array<Pieces.InteractionType>) {

        }

        public interactionTypeIsAvailable(type: Pieces.InteractionType): boolean {
            return true;
        }
    }
} 