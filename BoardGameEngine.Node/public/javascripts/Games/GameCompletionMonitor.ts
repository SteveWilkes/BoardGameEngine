module AgileObjects.BoardGameEngine.Games {

    export module GameCompletionMonitor {
        class GameCompletionMonitor {
            constructor(events: GameEventSet) {
                events.teamDefeated.subscribe(team => true);
            }
        }

        export var create = (events: GameEventSet) => {
            new GameCompletionMonitor(events);
        };
    }
}