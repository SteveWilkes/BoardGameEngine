module AgileObjects.StrategyGame.Game {

    export class TurnManager {
        private _currentOriginTile: IPieceLocation;

        constructor(
            board: Board,
            private _teams: Array<Team>,
            startingTeamIndex: number,
            events: EventSet) {
            events.pieceMoving.subscribe(originTile => this._validatePieceIsMoveable(originTile));
            events.pieceMoved.subscribe(destinationTile => this._updateCurrentTeam(destinationTile));

            this.setCurrentTeam(startingTeamIndex);

            board.orientTo(this.currentTeam);
        }

        public currentTeam: Team;

        private _validatePieceIsMoveable(originTile: IPieceLocation): boolean {
            this._currentOriginTile = originTile;

            return this.currentTeam.isLocal && this.currentTeam.owns(originTile.piece);
        }

        private _updateCurrentTeam(destinationTile: IPieceLocation): boolean {
            if (destinationTile !== this._currentOriginTile) {
                var currentTeamIndex = this._teams.indexOf(this.currentTeam);
                ++currentTeamIndex;
                if (currentTeamIndex === this._teams.length) {
                    currentTeamIndex = 0;
                }
                this.setCurrentTeam(currentTeamIndex);
            }
            return true;
        }

        private setCurrentTeam(teamIndex: number) {
            this.currentTeam = this._teams[teamIndex];
        }
    }
} 