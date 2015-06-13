module AgileObjects.BoardGameEngine.Players {

    export class PlayerJoinRequest {
        constructor(public playerId: string, public gameId: string) { }
    }
}