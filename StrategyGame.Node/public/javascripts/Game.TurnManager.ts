module AgileObjects.StrategyGame.Game {
    export module TurnManager {

        class TurnManagerInstance {
            private _currentTeamIndex: number;
            private _currentOriginTile: IPieceLocation;

            constructor(private _teams: Array<Team>, events: EventSet) {
                this._currentTeamIndex = 0;

                events.pieceMoving.subscribe(originTile => {
                    this._currentOriginTile = originTile;
                    var currentTeam = this._teams[this._currentTeamIndex];

                    return currentTeam.isLocal && currentTeam.owns(originTile.piece);
                });

                events.pieceMoved.subscribe(destinationTile => {
                    if (destinationTile !== this._currentOriginTile) {
                        ++this._currentTeamIndex;
                        if (this._currentTeamIndex === this._teams.length) {
                            this._currentTeamIndex = 0;
                        }
                    }
                    return true;
                });
            }

        }

        export function create(teams: Array<Team>, events: EventSet) {
            // ReSharper disable once WrongExpressionStatement
            new TurnManagerInstance(teams, events);
        }
    }
} 