class PlayerJoinHandler implements G.IGameSocketEventHandler {
    constructor(private _getGameDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: G.IGameSocket): void {
        socket.on("playerJoinRequested",(request: Pl.PlayerRequest) => {
            // TODO: Validate join request
            var gameData = this._getGameDataQuery.execute(request.gameId);
            socket.emitToGameRoom("playerJoinValidated", gameData, gameData.gameId);
        });
    }
}

export = PlayerJoinHandler;