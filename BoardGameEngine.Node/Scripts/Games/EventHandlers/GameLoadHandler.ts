class GameLoadHandler implements G.IGameSocketEventHandler {
    constructor(
        private _gameMapper: G.GameMapper,
        private _getGetDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: G.IGameSocket): void {
        socket.on("gameLoadRequested",(request: Pl.PlayerRequest) => {
            // TODO: Validate load request
            var gameData = this._getGetDataQuery.execute(request.gameId);
            socket.emit("gameLoadValidated", gameData);
        });

        socket.on("gameRestarted",(data: Pl.PlayerRequest) => {
            var gameData = this._getGetDataQuery.execute(data.gameId);
            var game = this._gameMapper.map(gameData);
            socket.addGame(game);
            socket.emitToGameRoom("playerJoinValidated", data, game.id);
            console.log("Game " + game.id + " recreated for player " + data.playerId);
        });
    }
}

export = GameLoadHandler;