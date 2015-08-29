class PlayerUpdateHandler implements G.IGameSocketEventHandler {
    constructor(private _getGameDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: G.IGameSocket): void {
        socket.on("playerNameUpdated",(request: Pl.PlayerRequest) => {
            // TODO: Validate update request
            var games = socket.getGames();
            for (var gameId in games) {
                this._getGameDataQuery.execute(gameId,(err, gameData) => {
                    if (err) {
                        return;
                    }

                    for (var i = 0; i < gameData.playerData.length; i++) {
                        if (gameData.playerData[i].id === request.playerId) {
                            gameData.playerData[i].name = request.playerName;
                            socket.emitToGameListeners("playerNameUpdateValidated", request, gameData.gameId);
                        }
                    }
                });
            }
        });
    }
}

export = PlayerUpdateHandler;