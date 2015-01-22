module AgileObjects.TypeScript {

    export class EventCallbackSet {
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