module AgileObjects.StrategyGame.Game.Players {
    import Pieces = StrategyGame.Game.Pieces;
    import Teams = StrategyGame.Game.Teams;

    export class RemotePlayerProxy extends PlayerBase implements IPlayer {
        constructor(id: string, private _game: Game) {
            super(id, false);
        }

        public takeTurn(team: Teams.Team): void {
            super.takeTurn(team);

            var allPotentialInteractions = new Array<Pieces.IPieceInteraction>();
            for (var i = 0; i < team.pieces.length; i++) {
                var piece = team.pieces[i];
                if (piece.hasBeenTaken()) { continue; }
                var potentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, this._game);
                allPotentialInteractions = allPotentialInteractions.concat(potentialInteractions);
            }
            var pieceMovement = Pieces.NullPotentialInteraction.INSTANCE;
            var pieceAttack = Pieces.NullPotentialInteraction.INSTANCE;
            while (pieceMovement.type !== Pieces.InteractionType.Move) {
                var interaction = this._getRandomInteraction(allPotentialInteractions);
                if (interaction.type === Pieces.InteractionType.Attack) {
                    pieceAttack = interaction;
                    continue;
                }
                pieceMovement = interaction;
                break;
            }

            pieceAttack.complete();
            pieceMovement.complete();
        }

        private _getRandomInteraction(allPotentialInteractions: Array<Pieces.IPieceInteraction>): Pieces.IPieceInteraction {
            var interactionIndex = Math.floor(Math.random() * (allPotentialInteractions.length - 1));
            var interaction = allPotentialInteractions[interactionIndex];

            return interaction;
        }
    }
}