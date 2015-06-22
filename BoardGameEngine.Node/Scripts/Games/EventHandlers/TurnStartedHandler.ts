import CpuPlayerAi = require("../../Players/CpuPlayerAi");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class TurnStartedHandler implements G.IGameSocketEventHandler {
    private _cpuPlayerAi: CpuPlayerAi;

    constructor() {
        this._cpuPlayerAi = new CpuPlayerAi();
    }

    public setup(socket: G.IGameSocket): void {
        socket.on("turnStarted",(gameId: string, teamId: string) => {
            var game = socket.getGame(gameId);
            if (game === undefined) { return; }

            var currentTeam = game.status.turnManager.currentTeam;
            if (currentTeam.id !== teamId) {
                throw new Error(
                    "Turn starting out of sync: " +
                    "expected team " + currentTeam.id + ", got team " + teamId);
            }
            if (currentTeam.owner.isHuman) { return; }

            var cpuTurnData = this._performCpuTurn(currentTeam, game.id);
            socket.broadcastToGameRoom("turnEnded", cpuTurnData, game.id);
        });
    }

    private _performCpuTurn(currentCpuTeam: T.Team, gameId: string): I.TurnData {
        var cpuTurnInteractions = new Array<I.InteractionId>();

        while (true) {
            var nextCpuTurnInteraction = this._cpuPlayerAi.getNextInteraction(currentCpuTeam);

            if (nextCpuTurnInteraction === undefined) { break; }

            nextCpuTurnInteraction.complete();
            var interactionId = Bge.Interactions.InteractionId.from(nextCpuTurnInteraction.id);
            cpuTurnInteractions.push(interactionId);
        }

        return Bge.Interactions.TurnData.from(cpuTurnInteractions, gameId);
    }
}

export = TurnStartedHandler;