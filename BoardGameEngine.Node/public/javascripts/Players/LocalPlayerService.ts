module AgileObjects.BoardGameEngine.Players {

    export var $localPlayerService = "$localPlayerService";

    var localPlayerId = "Ao.Bge.localPlayer.id";
    var localPlayerName = "Ao.Bge.localPlayer.name";

    "ClientOnly"
    export class LocalPlayerService {
        constructor(
            private _idGenerator: Angular.Services.IIdGenerator,
            private _localStorage: ng.localStorage.ILocalStorageService,
            private _httpService: ng.IHttpService) { }

        public get(callback: (player: Player) => void): void {
            var playerId = this.getPlayerId();

            if (playerId) {
                this._httpService.get("/api/players/" + playerId).then(result => {
                    var playerData = <PlayerData>result.data;
                    var player = (playerData == null)
                        ? this._createLocalHumanPlayer(playerData.id, playerData.name)
                        : this._createGuestPlayer(playerId);
                    callback(player);
                });
                return;
            }

            callback(this._createGuestPlayer());
        }

        public getPlayerId(): string {
            return this._localStorage.get(localPlayerId);
        }

        private _createGuestPlayer(id: string = this._idGenerator.generate()): Player {
            var playerName = this._localStorage.get(localPlayerName) || "Guest";
            var guest = this._createLocalHumanPlayer(id, playerName);
            guest["_isGuest"] = true;
            this._localStorage.set(localPlayerId, guest.id);

            return guest;
        }

        private _createLocalHumanPlayer(id: string, name: string) {
            return new Player(id, name, true, true);
        }

        public setPlayerName(localPlayer: Player) {
            if (localPlayer["_isGuest"]) {
                this._localStorage.set(localPlayerName, localPlayer.name);
            }
        }
    }

    angular
        .module(strategyGameApp)
        .service($localPlayerService, [
        Angular.Services.$idGenerator,
        "localStorageService",
        "$http",
        LocalPlayerService]);
}