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
                    var player = new Player(playerData.id, playerData.name, true, true);
                    callback(player);
                });
                return;
            }

            callback(this._createGuestPlayer());
        }

        public getPlayerId(): string {
            return this._cookieService.get("playerId");
        }

        private _createGuestPlayer(): Player {
            var playerId = this._idGenerator.generate();
            var guest = new Player(playerId, "Guest", true, true);
            this._cookieService.put("playerId", guest.id);

            return guest;
        }
    }

    angular
        .module(strategyGameApp)
        .service($localPlayerService, [
        Angular.Services.$idGenerator,
        "$cookieStore",
        "$http",
        LocalPlayerService]);
}