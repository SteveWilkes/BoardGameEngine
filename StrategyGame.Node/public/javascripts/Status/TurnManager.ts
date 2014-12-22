module AgileObjects.StrategyGame.Game.Status {

    export class TurnManager {
        private _currentOrigin: Pieces.IPieceLocation;

        constructor(
            board: Boards.Board,
            private _teams: Array<Teams.Team>,
            startingTeamIndex: number,
            events: EventSet) {

            events.pieceMoving.subscribe(origin => this._validatePieceIsFromCurrentTeam(origin));
            events.pieceMoved.subscribe(movement => this._handlePieceMovement(movement));

            this.setCurrentTeam(startingTeamIndex);

            board.orientTo(this.currentTeam);
        }

        public currentTeam: Teams.Team;

        private _validatePieceIsFromCurrentTeam(origin: Pieces.IPieceLocation): boolean {
            this._currentOrigin = origin;

            return this.currentTeam.owner.isLocal && this.currentTeam.owns(origin.piece);
        }

        private _handlePieceMovement(movement: Pieces.PieceMovement): boolean {
            if (movement.destination !== this._currentOrigin) {
                var currentTeamIndex = this._teams.indexOf(this.currentTeam);
                ++currentTeamIndex;
                if (currentTeamIndex === this._teams.length) {
                    currentTeamIndex = 0;
                }
                this.setCurrentTeam(currentTeamIndex);

                movement.whenEventCompletes(() => this.currentTeam.owner.takeTurn(this.currentTeam));
            }
            return true;
        }

        private setCurrentTeam(teamIndex: number) {
            this.currentTeam = this._teams[teamIndex];
        }
    }
} 