module AgileObjects.StrategyGame.Status {

    export var $gameCoordinationClient = "$gameCoordinationClient";

    "ClientOnly";
    class GameCoordinationClient implements Ui.IGameUiComponent {
        constructor(private _socket: SocketIO.Socket) { }

        public initialise(game: Games.Game): void {
            game.events.gameStarted.subscribe(() => {
                this._socket.emit("gameStarted", new GameData(game));
                return true;
            });

            game.events.turnStarted.subscribe(team => {
                this._socket.emit("turnStarted", team.id);
                return true;
            });

            game.events.pieceMoved.subscribe(movement => {
                var movementPath = new Array<string>(movement.path.length);
                for (var i = 0; i < movement.path.length; i++) {
                    movementPath[i] = movement.path[i].coordinates.signature;
                }
                this._socket.emit("pieceMoved", movementPath);
                return true;
            });
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameCoordinationClient, [Angular.Services.$socketFactory, GameCoordinationClient]);
}