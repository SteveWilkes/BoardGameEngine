module AgileObjects.BoardGameEngine.Players {

    export class CpuPlayerAi {
        public getNextInteraction(team: Teams.Team, game: Games.Game): Pieces.IPieceInteraction {
            var allPotentialInteractions = this._getAllPotentialInteractions(team, game);

            if (allPotentialInteractions.length === 0) { return undefined; }

            var interactionIndex = Math.floor(Math.random() * (allPotentialInteractions.length - 1));
            var interaction = allPotentialInteractions[interactionIndex];

            return interaction;
        }

        private _getAllPotentialInteractions(team: Teams.Team, game: Games.Game) {
            var allPotentialInteractions = new Array<Pieces.IPieceInteraction>();
            var pieces = team.getPieces();
            for (var pieceId in pieces) {
                var piece = pieces[pieceId];
                if (piece.hasBeenTaken()) { continue; }
                var potentialInteractions = piece.interactionProfile.getPotentialInteractions(game);
                for (var interactionId in potentialInteractions) {
                    allPotentialInteractions.push(potentialInteractions[interactionId]);
                }
            }
            return allPotentialInteractions;
        }
    }
}