﻿class PlayerJoinRequestedHandler implements G.IGameSocketEventHandler {
    constructor(private _getGetDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: G.IGameSocket): void {
        socket.on("playerJoinRequested",(request: Pl.PlayerJoinRequest) => {
            // TODO: Validate join request
            var gameData = this._getGetDataQuery.execute(request.gameId);
            socket.emitToGameRoom("playerJoinValidated", gameData, gameData.gameId);
        });
    }
}

export = PlayerJoinRequestedHandler;