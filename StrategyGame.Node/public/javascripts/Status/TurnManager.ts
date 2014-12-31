module AgileObjects.StrategyGame.Game.Status {

    export class TurnManager {
        private _teams: Array<Teams.Team>;
        private _currentOrigin: Pieces.IPieceLocation;

        constructor(private _events: GameEventSet) {
            this._events.gameStarted.subscribe(team => this._setStartingTeam(team));
            this._events.teamAdded.subscribe(team => this._registerTeam(team));
            this._events.pieceMoving.subscribe(piece => this._validatePieceIsFromCurrentTeam(piece));
            this._events.pieceMoved.subscribe(movement => this._handlePieceMovement(movement));

            this._teams = new Array<Teams.Team>();
        }

        public currentTeam: Teams.Team;

        private _setStartingTeam(team: Teams.Team): boolean {
            this.setCurrentTeam(this._teams.indexOf(team));

            return this._turnStarted();
        }

        private _registerTeam(team: Teams.Team): boolean {
            this._teams.push(team);
            return true;
        }

        private _validatePieceIsFromCurrentTeam(piece: Pieces.Piece): boolean {
            this._currentOrigin = piece.location;

            return this.currentTeam.owner.isLocal && this.currentTeam.owns(piece);
        }

        private _handlePieceMovement(movement: Pieces.PieceMovement): boolean {
            if (movement.destination !== this._currentOrigin) {
                var currentTeamIndex = this._teams.indexOf(this.currentTeam);
                ++currentTeamIndex;
                if (currentTeamIndex === this._teams.length) {
                    currentTeamIndex = 0;
                }
                this.setCurrentTeam(currentTeamIndex);

                movement.whenEventCompletes(() => {
                    if (this._turnStarted()) {
                        this.currentTeam.owner.takeTurn(this.currentTeam);
                    }
                });
            }
            return true;
        }

        private setCurrentTeam(teamIndex: number) {
            this.currentTeam = this._teams[teamIndex];
        }

        private _turnStarted(): boolean {
            return this._events.turnStarted.publish(this.currentTeam);
        }
    }
} 