module AgileObjects.StrategyGame.Game.Players {
    import Pieces = StrategyGame.Game.Pieces;
    import Teams = StrategyGame.Game.Teams;

    export interface IPlayer extends Teams.ITeamOwner {
        id: string;
    }

    export class PlayerBase {
        protected Team: Teams.Team;

        public add(team: Teams.Team): void {
            this.Team = team;
        }
    }

    export class AiPlayerProxy extends PlayerBase implements IPlayer {
        constructor(public id: string, private _events: EventSet) {
            super();

            this.isLocal = false;
        }

        public isLocal: boolean;

        public takeTurn(): void {
            var movablePieces = new TypeScript.Dictionary<Pieces.IPiece, Array<Pieces.IPieceLocation>>();
            for (var i = 0; i < this.Team.pieces.length; i++) {
                var piece = this.Team.pieces[i];
                var validPieceDestinations = piece.movementProfile.getValidDestinations(piece.location);
                if (validPieceDestinations.length > 0) {
                    movablePieces.add(piece, validPieceDestinations);
                }
            }
            var pieceToMoveIndex = Math.floor(Math.random() * (movablePieces.count - 1));
            var pieceToMove = movablePieces.keys[pieceToMoveIndex];
            var pieceDestinations = movablePieces.get(pieceToMove);
            var pieceDestinationIndex = Math.floor(Math.random() * (pieceDestinations.length - 1));
            var pieceDestination = pieceDestinations[pieceDestinationIndex];
            pieceToMove.location.movePieceTo(pieceDestination);
        }
    }

    export class HumanPlayer extends PlayerBase implements IPlayer {
        constructor(public id: string, public isLocal: boolean) {
            super();
        }

        public takeTurn(): void { }
    }
}