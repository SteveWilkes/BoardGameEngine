module AgileObjects.BoardGameEngine.Games {

    export class PlayerJoinRequestedHandler implements Node.ISessionSocketEventHandler {
        constructor(private _getGetDataQuery: Ts.IGetQuery<GameData>) { }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("playerJoinRequested",(request: Pl.PlayerJoinRequest) => {
                // TODO: Validate join request
                var gameData = this._getGetDataQuery.execute(request.gameId);
                socket.emit("playerJoinValidated", gameData);
            });
        }
    }
}