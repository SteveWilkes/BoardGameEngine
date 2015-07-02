module AgileObjects.BoardGameEngine.Games {
    import Boards = BoardGameEngine.Boards;

    var menuItems = [
        new Angular.MenuItem("players", "Players", "users"),
        new Angular.MenuItem("history", "Game history", "history"),
        new Angular.MenuItem("debug", "Debug", "bug")];

    var editHandlers = [
        new Players.PlayerNameEditHandler()];

    "ClientOnly";
    class GameController extends Angular.ControllerBase {
        constructor(
            private _localPlayerService: Pl.LocalPlayerService,
            private _gameService: GameService,
            private _clientComponentSet: Ui.CompositeClientComponentSet) {

            super(menuItems, editHandlers);

            GlobalEventSet.instance.gameLoaded.subscribe(game => this._handleGameLoaded(game) === void (0));
            GlobalEventSet.instance.playerJoined.subscribe(player => this._handlePlayerJoined(player) === void (0));

            this.globalEvents = GlobalEventSet.instance;
            this.displayManager = this._clientComponentSet.displayManager;

            var requestedGameId = this._clientComponentSet.urlManager.gameId();

            if (requestedGameId !== undefined) {
                this.loadGame(requestedGameId);
                return;
            }

            this._localPlayerService.get(localPlayer => {
                this.localPlayer = localPlayer;
                this.startGame();
            });
        }

        public globalEvents: GlobalEventSet;
        public displayManager: B.BoardDisplayManager;
        public localPlayer: Pl.Player;
        public game: Game;

        public startGame(): void {
            this.startDefaultGame("run-the-bomb");
        }

        public startDefaultGame(gameTypeId: string): void {
            this._initialiseGame(this._gameService.createDefaultGame(gameTypeId, this.localPlayer));
            this.game.start();
        }

        public loadGame(gameId: string): void {
            var localPlayerId = this._localPlayerService.getPlayerId();
            var localPlayerName = this._localPlayerService.getPlayerName();
            var loadRequest = new Players.PlayerRequest(localPlayerId, localPlayerName, gameId);
            this.globalEvents.gameLoadRequested.publish(loadRequest);
        }

        private _handleGameLoaded(game: Game): void {
            this._assignLocalPlayer(game);
            this._initialiseGame(game);
        }

        private _assignLocalPlayer(game: Game): void {
            var localPlayerId = this._localPlayerService.getPlayerId();

            for (var i = 0; i < game.players.length; i++) {
                var player = game.players[i];
                if (player.id === localPlayerId) {
                    player.isLocal = true;
                    this.localPlayer = player;
                    return;
                }
            }
        }

        private _initialiseGame(game: Game): void {
            this.game = game;
            this._clientComponentSet.initialise(game);
        }

        private _handlePlayerJoined(player: Pl.Player): void {
            this.game.add(player);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [
        Players.$localPlayerService,
        $gameService,
        Ui.$clientComponentSet,
        GameController]);
}