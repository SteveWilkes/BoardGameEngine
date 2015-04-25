module AgileObjects.BoardGameEngine.Games {

    export module GameCompletionMonitor {
        class GameCompletionMonitor {
            private _activeTeams: Array<T.Team>;

            constructor(private _events: GameEventSet) {
                this._events.teamAdded.subscribe(teamData => this._activeTeams.push(teamData.team) > 0);
                this._events.teamRemoved.subscribe(team => this._activeTeams.remove(team) === void (0));
                this._events.teamDefeated.subscribe((team, callbackSet) => this._handleTeamDefeat(team, callbackSet));

                this._activeTeams = new Array<T.Team>();
            }

            private _handleTeamDefeat(defeatedTeam: T.Team, callbackSet: Ts.EventCallbackSet): boolean {
                this._activeTeams.remove(defeatedTeam);
                if (this._activeTeams.length === 1) {
                    callbackSet.whenEventCompletes(() => {
                        this._events.gameWon.publish(this._activeTeams[0]);
                    });
                }

                return true;
            }
        }

        export var create = (events: GameEventSet) => {
            new GameCompletionMonitor(events);
        };
    }
}