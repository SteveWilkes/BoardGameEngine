module AgileObjects.StrategyGame.Game {

    export class TurnManager {
        private _currentTeamIndex: number;
        private _currentOriginTile: IPieceLocation;

        constructor(board: Board, private _teams: Array<Team>, events: EventSet) {
            events.pieceMoving.subscribe(originTile => this._validatePieceIsMoveable(originTile));
            events.pieceMoved.subscribe(destinationTile => this._updateCurrentTeam(destinationTile));

            this._currentTeamIndex = 0;
            this.setCurrentTeam();
        }

        private _validatePieceIsMoveable(originTile: IPieceLocation): boolean {
            this._currentOriginTile = originTile;

            return this.currentTeam.isLocal && this.currentTeam.owns(originTile.piece);
        }

        private _updateCurrentTeam(destinationTile: IPieceLocation): boolean {
            if (destinationTile !== this._currentOriginTile) {
                ++this._currentTeamIndex;
                if (this._currentTeamIndex === this._teams.length) {
                    this._currentTeamIndex = 0;
                }
                this.setCurrentTeam();
            }
            return true;
        }

        private setCurrentTeam() {
            this.currentTeam = this._teams[this._currentTeamIndex];
        }

        public currentTeam: Team;
    }
} 