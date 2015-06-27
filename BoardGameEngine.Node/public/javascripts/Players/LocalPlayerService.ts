module AgileObjects.BoardGameEngine.Players {

    export var $localPlayerService = "$localPlayerService";

    "ClientOnly"
    export class LocalPlayerService {
        constructor(
            private _idGenerator: Angular.Services.IIdGenerator,
            private _cookieService: ng.cookies.ICookiesService,
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
            return this._cookieService.get("playerId");
        }

        private _createGuestPlayer(id: string = this._idGenerator.generate()): Player {
            var playerName = this._cookieService.get("playerName") || "Guest";
            var guest = this._createLocalHumanPlayer(id, playerName);
            guest["_isGuest"] = true;
            var expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            this._cookieService.put("playerId", guest.id, { expires: expiryDate });
            this._cookieService.put("playerExpiry", expiryDate.toString(), { expires: expiryDate });

            return guest;
        }

        private _createLocalHumanPlayer(id: string, name: string) {
            return new Player(id, name, true, true);
        }

        public setPlayerName(localPlayer: Player) {
            if (localPlayer["_isGuest"]) {
                var playerExpiryDate = this._cookieService.get("playerExpiry");
                this._cookieService.put("playerName", localPlayer.name, { expires: playerExpiryDate });
            }
        }
    }

    angular
        .module(strategyGameApp)
        .service($localPlayerService, [
        Angular.Services.$idGenerator,
        "$cookies",
        "$http",
        LocalPlayerService]);
}