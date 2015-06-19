module AgileObjects.BoardGameEngine.Interactions {

    export class TurnApplicationManager {
        constructor(private _game: G.Game) { }

        public apply(turnData: TurnData|InteractionId) {
            var interactions = this._getInteractions(turnData);

            var currentTeamPieces = this._game.status.turnManager.currentTeam.getPieces();
            for (var i = 0; i < interactions.length; i++) {
                var interaction = interactions[i];
                if (!currentTeamPieces.hasOwnProperty(interaction.pieceId)) {
                    throw new Error(
                        "Interaction completion out of sync: " +
                        "expected pieces for team " + this._game.status.turnManager.currentTeam.id + ", " +
                        "got piece " + interaction.pieceId);
                }
                var piece = currentTeamPieces[interaction.pieceId];
                var potentialInteractions = piece.interactionProfile.getPotentialInteractions();
                if (!potentialInteractions.hasOwnProperty(interaction.signature)) {
                    throw new Error(
                        "Interaction completion out of sync: " +
                        "expected interactions for piece " + interaction.pieceId + ", " +
                        "got interaction " + interaction.signature);
                }
                potentialInteractions[interaction.signature].complete();
            }
        }

        private _getInteractions(turnData: TurnData|InteractionId): Array<InteractionId> {
            return turnData.hasOwnProperty("interactionData")
                ? (<TurnData>turnData).interactionData
                : [<InteractionId>turnData];
        }
    }
}