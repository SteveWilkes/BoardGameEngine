module AgileObjects.Angular.Services {

    export interface IEventPropogationService {
        propogate<TData>(
            eventHub: TypeScript.EventHub<TData>,
            eventName: string,
            domElementIdFinder: (data: TData) => string);
    }

    export var $eventPropogator = "$eventPropogator";

    class EventPropogationService implements IEventPropogationService {
        constructor(private _windowService: ng.IWindowService) { }

        public propogate<TData>(
            eventHub: TypeScript.EventHub<TData>,
            eventName: string,
            domElementIdFinder: (data: TData) => string) {

            eventHub.subscribe(data => {
                var elementId = domElementIdFinder(data);
                var element = this._windowService.document.getElementById(elementId);

                angular.element(element).raiseEvent(eventName);

                return true;
            });
        }
    }

    export function addEventPropogation(angularModule: ng.IModule) {
        angularModule.service($eventPropogator, ["$window", EventPropogationService]);
    }
}