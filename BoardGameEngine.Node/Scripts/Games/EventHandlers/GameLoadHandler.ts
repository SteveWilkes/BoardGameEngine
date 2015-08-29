class GameLoadHandler implements G.IGameSocketEventHandler {
    constructor(
        private _gameMapper: G.GameMapper,
        private _getGameDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: G.IGameSocket): void {
        socket.on("gameLoadRequested",(request: Pl.PlayerRequest) => {
            // TODO: Validate load request
            this._getGameDataQuery.execute(request.gameId,(err, gameData) => {
                if (err) {
                    // TODO: Handle error
                    return;
                }

                socket.emit("gameLoadValidated", gameData);
            });
        });

        socket.on("gameRestarted",(data: Pl.PlayerRequest) => {
            this._getGameDataQuery.execute(data.gameId,(gameDataError, gameData) => {
                if (gameDataError) {
                    // TODO: Handle error
                    return;
                }

                this._gameMapper.map(gameData,(gameMapperError, game) => {
                    if (gameMapperError) {
                        // TODO: Handle error
                        return;
                    }

                    socket.addGame(game);
                    socket.emitToGameRoom("playerJoinValidated", data, game.id);
                    console.log("Game " + game.id + " recreated for player " + data.playerId);
                });
            });
        });
    }
}

export = GameLoadHandler;