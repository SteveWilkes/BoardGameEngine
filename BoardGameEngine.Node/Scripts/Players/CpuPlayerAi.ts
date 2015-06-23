var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;

class CpuPlayerAi {
    public getNextTurn(currentCpuTeam: T.Team, gameId: string): I.TurnData {
        var cpuTurnInteractions = new Array<I.InteractionId>();

        while (true) {
            var nextCpuTurnInteraction = this._getNextInteraction(currentCpuTeam);

            if (nextCpuTurnInteraction === undefined) { break; }

            nextCpuTurnInteraction.complete();
            var interactionId = Bge.Interactions.InteractionId.from(nextCpuTurnInteraction.id);
            cpuTurnInteractions.push(interactionId);
        }

        return Bge.Interactions.TurnData.from(cpuTurnInteractions, gameId);
    }

    private _getNextInteraction(team: T.Team): IPieceInteraction {
        var allPotentialInteractions = this._getAllPotentialInteractions(team);

        if (allPotentialInteractions.length === 0) { return undefined; }

        var interactionIndex = Math.floor(Math.random() * (allPotentialInteractions.length - 1));
        var interaction = allPotentialInteractions[interactionIndex];

        return interaction;
    }

    private _getAllPotentialInteractions(team: T.Team) {
        var allPotentialInteractions = new Array<IPieceInteraction>();
        var pieces = team.getPieces();
        for (var pieceId in pieces) {
            var piece = pieces[pieceId];
            if (piece.hasBeenTaken()) { continue; }
            var potentialInteractions = piece.interactionProfile.getPotentialInteractions();
            for (var interactionId in potentialInteractions) {
                allPotentialInteractions.push(potentialInteractions[interactionId]);
            }
        }
        return allPotentialInteractions;
    }
}

export = CpuPlayerAi;