module AgileObjects.BoardGameEngine.Interactions {
    
    export class TurnInteractionDefinition {
        constructor(
            public interactionType: InteractionType) {
            
        }

        public isAvailable(game: G.Game): boolean {
            return true;
        }
    }
}