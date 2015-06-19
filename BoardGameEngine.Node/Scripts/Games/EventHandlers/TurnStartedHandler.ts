import ISessionSocketEventHandler = require("../../Generic/AgileObjects.Node.ISessionSocketEventHandler");
import ISessionSocket = require("../../Generic/AgileObjects.Node.ISessionSocket");
import CpuPlayerAi = require("../../Players/CpuPlayerAi");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class TurnStartedHandler implements ISessionSocketEventHandler {
    private _cpuPlayerAi: CpuPlayerAi;

    constructor() {
        this._cpuPlayerAi = new CpuPlayerAi();
    }

    public setup(socket: ISessionSocket): void {
        socket.on("turnStarted",(teamId: string) => {
            var game: G.Game = socket.session.game;
            var currentTeam = game.status.turnManager.currentTeam;
            if (currentTeam.id !== teamId) {
                throw new Error(
                    "Turn starting out of sync: " +
                    "expected team " + currentTeam.id + ", got team " + teamId);
            }
            if (currentTeam.owner.isHuman) { return; }

            var cpuTurnData = this._performCpuTurn(currentTeam);
            socket.emit("turnEnded", cpuTurnData);
        });
    }

    private _performCpuTurn(currentCpuTeam: T.Team): I.TurnData {
        var cpuTurnInteractions = new Array<IPieceInteraction>();

        while (true) {
            var nextCpuTurnInteraction = this._cpuPlayerAi.getNextInteraction(currentCpuTeam);

            if (nextCpuTurnInteraction === undefined) { break; }

            nextCpuTurnInteraction.complete();
            cpuTurnInteractions.push(nextCpuTurnInteraction);
        }

        return Bge.Interactions.TurnData.forInteractions(cpuTurnInteractions);
    }
}

export = TurnStartedHandler;