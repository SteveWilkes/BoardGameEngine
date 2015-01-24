module AgileObjects.StrategyGame.Players {

    export class CpuPlayerAi {
        public getNextTurn(team: Teams.Team, game: Games.Game): Array<Pieces.IPieceInteraction> {
            var allPotentialInteractions = this._getAllPotentialInteractions(team, game);
            var moveInteractions = new Array<Pieces.IPieceInteraction>();
            var interaction = Pieces.NullPotentialInteraction.INSTANCE;
            while (interaction.type !== Pieces.InteractionType.Move) {
                interaction = this._getRandomInteraction(allPotentialInteractions);
                if (interaction.type === Pieces.InteractionType.Attack) {
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
            for (var i = 0; i < team.pieces.length; i++) {
                var piece = team.pieces[i];
                if (piece.hasBeenTaken()) { continue; }
                var potentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, game);
                allPotentialInteractions = allPotentialInteractions.concat(potentialInteractions);
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