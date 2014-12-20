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
            var eventCallbackSet = <IEventCallbackSet><Object>eventData;
            if (typeof eventCallbackSet.executeAll === "function") {
                eventCallbackSet.executeAll();
            }
            return true;
        }
    }

    export interface IEventCallbackSet {
        whenEventCompletes(callbackToExecute: () => void): void;

        executeAll(): void;
    }

    export class EventCallbackSetBase implements IEventCallbackSet {
        private _callbacks: Array<() => void>;

        constructor() {
            this._callbacks = new Array<() => void>();
        }

        public whenEventCompletes(callbackToExecute: () => void): void {
            this._callbacks.push(callbackToExecute);
        }

        public executeAll(): void {
            for (var i = 0; i < this._callbacks.length; i++) {
                this._callbacks[i]();
            }
        }
    }
}