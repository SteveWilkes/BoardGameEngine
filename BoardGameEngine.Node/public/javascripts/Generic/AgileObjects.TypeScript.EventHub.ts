module AgileObjects.TypeScript {

    export class EventHub<TData> {
        private _subscribers: Array<(eventData: TData, completionCallbacks: EventCallbackSet) => boolean>;

        constructor() {
            this._subscribers = new Array<(eventData: TData, completionCallbacks: EventCallbackSet) => boolean>();
        }

        public subscribe(callback: (eventData: TData, completionCallbacks?: EventCallbackSet) => boolean): EventHub<TData> {
            this._subscribers.push(callback);
            return this;
        }

        public publish(eventData: TData): boolean {
            var callbackSet = new EventCallbackSet();
            for (var i = 0; i < this._subscribers.length; i++) {
                if (this._subscribers[i](eventData, callbackSet) === false) {
                    return false;
                }
            }
            callbackSet.executeAll();
            return true;
        }
    }
}