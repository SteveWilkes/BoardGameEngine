module AgileObjects.StrategyGame.Game.Status {
    import Boards = StrategyGame.Game.Boards;
    import Pieces = StrategyGame.Game.Pieces;
    import Teams = StrategyGame.Game.Teams;

    export class TurnManager {
        private _currentOriginTile: Pieces.IPieceLocation;

        constructor(
            board: Boards.Board,
            private _teams: Array<Teams.Team>,
            startingTeamIndex: number,
            events: EventSet) {

            events.pieceMoving.subscribe(originTile => this._validatePieceIsMoveable(originTile));
            events.pieceMoved.subscribe(destinationTile => this._updateCurrentTeam(destinationTile));

            this.setCurrentTeam(startingTeamIndex);

            board.orientTo(this.currentTeam);
        }

        public currentTeam: Teams.Team;

        private _validatePieceIsMoveable(originTile: Pieces.IPieceLocation): boolean {
            this._currentOriginTile = originTile;

            return this.currentTeam.owner.isLocal && this.currentTeam.owns(originTile.piece);
        }

        private _updateCurrentTeam(destinationTile: Pieces.IPieceLocation): boolean {
            if (destinationTile !== this._currentOriginTile) {
                var currentTeamIndex = this._teams.indexOf(this.currentTeam);
                ++currentTeamIndex;
                if (currentTeamIndex === this._teams.length) {
                    currentTeamIndex = 0;
                }
                this.setCurrentTeam(currentTeamIndex);
                this.currentTeam.owner.takeTurn();
            }
            return true;
        }

        private setCurrentTeam(teamIndex: number) {
            this.currentTeam = this._teams[teamIndex];
        }
    }
} 