module AgileObjects.BoardGameEngine.Games {

    export class TurnStartedHandler implements Node.ISessionSocketEventHandler {
        private _cpuPlayerAi: Pl.CpuPlayerAi;

        constructor() {
            this._cpuPlayerAi = new Players.CpuPlayerAi();
        }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("turnStarted",(teamId: string) => {
                var game: Game = socket.session.game;
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

            return Interactions.TurnData.forInteractions(cpuTurnInteractions);
        }
    }
}