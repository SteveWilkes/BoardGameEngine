﻿module AgileObjects.StrategyGame.Game.Status {

    export class TurnManager {
        private _currentOrigin: Pieces.IPieceLocation;

        constructor(
            board: Boards.Board,
            private _teams: Array<Teams.Team>,
            startingTeamIndex: number,
            private _events: EventSet) {

            this._events.pieceMoving.subscribe(piece => this._validatePieceIsFromCurrentTeam(piece));
            this._events.pieceMoved.subscribe(movement => this._handlePieceMovement(movement));

            this.setCurrentTeam(startingTeamIndex);

            board.orientTo(this.currentTeam);

            this._events.turnStarted.publish(this.currentTeam);
        }

        public currentTeam: Teams.Team;

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
                    this._events.turnStarted.publish(this.currentTeam);
                    this.currentTeam.owner.takeTurn(this.currentTeam);
                });
            }
            return true;
        }

        private setCurrentTeam(teamIndex: number) {
            this.currentTeam = this._teams[teamIndex];
        }
    }
} 