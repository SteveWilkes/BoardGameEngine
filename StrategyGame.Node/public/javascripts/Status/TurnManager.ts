module AgileObjects.StrategyGame.Status {

    export class TurnManager {
        private _teams: Array<Teams.Team>;
        private _turnHasEnded: boolean;

        constructor(private _events: Games.GameEventSet) {
            this._events.gameStarted.subscribe(team => this._setStartingTeam(team));
            this._events.teamAdded.subscribe(team => this._registerTeam(team));
            this._events.pieceMoving.subscribe(piece => this._verifyPieceIsMovable(piece));
            this._events.turnEnded.subscribe((team, eventData) => this._turnEnded(eventData));

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

        private _verifyPieceIsMovable(piece: Pieces.Piece): boolean {
            return this.currentTeam.owner.isLocal && this.currentTeam.owns(piece);
        }

        private _turnEnded(eventData: TypeScript.EventCallbackSet): boolean {
            if (this._turnHasEnded === false) {
                var currentTeamIndex = this._teams.indexOf(this.currentTeam);
                ++currentTeamIndex;
                if (currentTeamIndex === this._teams.length) {
                    currentTeamIndex = 0;
                }
                this.setCurrentTeam(currentTeamIndex);

                eventData.whenEventCompletes(() => {
                    if (this._turnStarted()) {
                        this.currentTeam.owner.takeTurn(this.currentTeam);
                    }
                });

                this._turnHasEnded = true;
            }
            return true;
        }

        private setCurrentTeam(teamIndex: number) {
            this.currentTeam = this._teams[teamIndex];
        }

        private _turnStarted(): boolean {
            this._turnHasEnded = false;
            return this._events.turnStarted.publish(this.currentTeam);
        }
    }
} 