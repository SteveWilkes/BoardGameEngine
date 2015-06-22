class GameStartedHandler implements G.IGameSocketEventHandler {
    constructor(
        private _gameMapper: G.GameMapper,
        private _getGetDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: G.IGameSocket): void {
        socket.on("gameRestarted",(gameId: string) => {
            var gameData = this._getGetDataQuery.execute(gameId);
            var game = this._gameMapper.map(gameData);
            socket.addGame(game);
            console.log("Game " + game.id + " recreated");
        });
    }
}

export = GameStartedHandler;