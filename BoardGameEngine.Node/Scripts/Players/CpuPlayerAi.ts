module AgileObjects.BoardGameEngine.Players {

    export class CpuPlayerAi {
        public getNextTurn(team: Teams.Team, game: Games.Game): Array<Pieces.IPieceInteraction> {
            var allPotentialInteractions = this._getAllPotentialInteractions(team, game);
            var moveInteractions = new Array<Pieces.IPieceInteraction>();
            var interaction = Pieces.NullPotentialInteraction.INSTANCE;
            while (interaction.type !== Pieces.InteractionType.move) {
                interaction = this._getRandomInteraction(allPotentialInteractions);
                if (interaction.type === Pieces.InteractionType.attack) {
                    moveInteractions.push(interaction);
                    allPotentialInteractions = this._getAllPotentialInteractions(team, game);
                    continue;
                }
                moveInteractions.push(interaction);
                break;
            }

            return moveInteractions;
        }

        private _getAllPotentialInteractions(team: Teams.Team, game: Games.Game) {
            var allPotentialInteractions = new Array<Pieces.IPieceInteraction>();
            var pieces = team.getPieces();
            for (var pieceId in pieces) {
                var piece = pieces[pieceId];
                if (piece.hasBeenTaken()) { continue; }
                var potentialInteractions = piece.getPotentialInteractions(game);
                for (var interactionId in potentialInteractions) {
                    allPotentialInteractions.push(potentialInteractions[interactionId]);
                }
            }
            return allPotentialInteractions;
        }

        private _getRandomInteraction(allPotentialInteractions: Array<Pieces.IPieceInteraction>): Pieces.IPieceInteraction {
            var interactionIndex = Math.floor(Math.random() * (allPotentialInteractions.length - 1));
            var interaction = allPotentialInteractions[interactionIndex];

            return interaction;
        }
    }
}