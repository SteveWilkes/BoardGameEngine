module AgileObjects.BoardGameEngine.Players {

    export class PlayerRequest {
        constructor(public playerId: string, public gameId: string) { }
    }
}