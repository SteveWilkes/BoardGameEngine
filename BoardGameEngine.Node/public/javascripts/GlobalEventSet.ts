﻿module AgileObjects.BoardGameEngine {

    export class GlobalEventSet {
        static instance = new GlobalEventSet();

        public containerResized = new TypeScript.EventHub<B.Board>();
        public gameLoadRequested = new TypeScript.EventHub<Pl.PlayerRequest>();
        public gameLoaded = new TypeScript.EventHub<G.Game>();
        public playerJoinRequested = new TypeScript.EventHub<Pl.PlayerRequest>();
        public playerJoined = new TypeScript.EventHub<Pl.Player>();
        public playerNameUpdated = new TypeScript.EventHub<Pl.PlayerRequest>();
    }
} 