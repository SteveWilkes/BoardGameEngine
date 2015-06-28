module AgileObjects.BoardGameEngine.Players {

    export class PlayerRequest {
        constructor(
            public playerId: string,
            public playerName: string,
            public gameId: string) { }
    }
}