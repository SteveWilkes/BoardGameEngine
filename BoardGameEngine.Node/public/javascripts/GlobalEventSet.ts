module AgileObjects.BoardGameEngine {

    export class GlobalEventSet {
        static instance = new GlobalEventSet();

        public containerResized = new TypeScript.EventHub<B.Board>();
        public playerJoinRequested = new TypeScript.EventHub<Pl.PlayerJoinRequest>();
    }
} 