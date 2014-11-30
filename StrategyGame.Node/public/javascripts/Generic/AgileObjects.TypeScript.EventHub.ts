
module AgileObjects.TypeScript {

    export class EventHub<TData> {
        private _subscribers: Array<(eventData: TData) => boolean>;

        constructor() {
            this._subscribers = new Array<(eventData: TData) => boolean>();
        }

        public subscribe(callback: (eventData: TData) => boolean): EventHub<TData> {
            this._subscribers.push(callback);
            return this;
        }

        public publish(eventData: TData): boolean {
            for (var i = 0; i < this._subscribers.length; i++) {
                if (this._subscribers[i](eventData) === false) {
                    return false;
                }
            }
            return true;
        }
    }
} 