module AgileObjects.StrategyGame.Game.Status {

    export var $gameCoordinationClient = "$gameCoordinationClient";

    class GameCoordinationClient implements Ui.IGameUiComponent {
        constructor(private _socket: SocketIO.Socket) { }

        public gameCreated(game: IGameCoordinationSubject): void {
            game.events.gameStarted.subscribe(() => {
                this._socket.emit("gameStarted", game.id);
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