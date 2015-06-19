import ISessionSocketEventHandler = require("../../Generic/AgileObjects.Node.ISessionSocketEventHandler");
import ISessionSocket = require("../../Generic/AgileObjects.Node.ISessionSocket");

class PlayerJoinRequestedHandler implements ISessionSocketEventHandler {
    constructor(private _getGetDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: ISessionSocket): void {
        socket.on("playerJoinRequested",(request: Pl.PlayerJoinRequest) => {
            // TODO: Validate join request
            var gameData = this._getGetDataQuery.execute(request.gameId);
            socket.emit("playerJoinValidated", gameData);
        });
    }
}

export = PlayerJoinRequestedHandler;