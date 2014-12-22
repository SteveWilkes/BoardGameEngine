module AgileObjects.StrategyGame.Game.Players {
    import Pieces = StrategyGame.Game.Pieces;
    import Teams = StrategyGame.Game.Teams;

    export interface IPlayer extends Teams.ITeamOwner { }

    export class PlayerBase implements IPlayer {
        constructor(public id: string, public isLocal: boolean) { }

        public add(team: Teams.Team): void {
            team.owner = this;
        }

        public takeTurn(team: Teams.Team): void { }
    }

    export class RemotePlayerProxy extends PlayerBase implements IPlayer {
        constructor(id: string, private _events: EventSet) {
            super(id, false);
        }

        public takeTurn(team: Teams.Team): void {
            super.takeTurn(team);

            var movablePieces = new TypeScript.Dictionary<Pieces.Piece, Array<Pieces.IPieceLocation>>();
            for (var i = 0; i < team.pieces.length; i++) {
                var piece = team.pieces[i];
                var validPieceDestinations = piece.movementProfile.getDestinations(piece.location);
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

    export class LocalHumanPlayer extends PlayerBase implements IPlayer {
        constructor(id: string) {
            super(id, true);
        }
    }
}