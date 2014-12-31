module AgileObjects.StrategyGame.Game.Players {
    import Pieces = StrategyGame.Game.Pieces;
    import Teams = StrategyGame.Game.Teams;

    export interface IPlayer extends Teams.ITeamOwner {
        teams: Array<Teams.Team>;
    }

    export class PlayerBase implements IPlayer {
        constructor(public id: string, public isLocal: boolean) {
            this.teams = new Array<Teams.Team>();
        }

        public teams: Array<Teams.Team>;

        public add(team: Teams.Team): void {
            team.owner = this;
            this.teams.push(team);
        }

        public takeTurn(team: Teams.Team): void { }
    }

    export class RemotePlayerProxy extends PlayerBase implements IPlayer {
        constructor(id: string, private _events: GameEventSet) {
            super(id, false);
        }

        public takeTurn(team: Teams.Team): void {
            super.takeTurn(team);

            var allPotentialInteractions = new Array<Pieces.IPieceInteraction>();
            for (var i = 0; i < team.pieces.length; i++) {
                var piece = team.pieces[i];
                if (piece.hasBeenTaken()) { continue; }
                var potentialInteractions = piece.interactionProfile.getPotentialInteractions(piece);
                allPotentialInteractions = allPotentialInteractions.concat(potentialInteractions);
            }
            var pieceMovement = Pieces.NullPotentialInteraction.instance;
            var pieceAttack = Pieces.NullPotentialInteraction.instance;
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

    export class LocalHumanPlayer extends PlayerBase implements IPlayer {
        constructor(id: string) {
            super(id, true);
        }
    }
}