module AgileObjects.TypeScript {
    var ignore = null;

    export class JoqIterator<TResult> {
        constructor(private _seed: any, private _handler: (propertyValue: any, propertyName: string) => TResult) { }

        public select<TNewResult>(projection: (value: TResult) => TNewResult): JoqIterator<TNewResult> {
            var handler = (propertyValue: any, propertyName: string) => {
                var result = this._handler(propertyValue, propertyName);
                return projection(result);
            };
            return new JoqIterator(this._seed, handler);
        }

        public where(predicate: (propertyValue: any, propertyName?: string) => boolean): JoqIterator<TResult> {
            var handlerSoFar = this._handler;
            this._handler = (propertyValue: any, propertyName: string) => {
                return predicate(propertyValue, propertyName) ? handlerSoFar(propertyValue, propertyName) : ignore;
            };
            return this;
        }

        public first() {
            var result = ignore;

            this._iterate(propertyValue => {
                result = propertyValue;
                return false;
            });

            if (result !== ignore) { return result; }

            throw new Error("No properties to iterate");
        }

        public toArray() {
            var results = new Array<TResult>();
            this._iterate((propertyValue, propertyName) => {
                var result = this._handler(propertyValue, propertyName);
                if (result !== ignore) { results.push(result); }
                return true;
            });
            return results;
        }

        private _iterate(handler: (value, index) => boolean) {
            var continueIteration;

            if (this._seed instanceof Array) {
                var seedLength = this._seed.length;
                for (var i = 0; i < seedLength; i++) {
                    continueIteration = handler(this._seed[i], i);

                    if (continueIteration === false) { break; }
                }
                return;
            }

            for (var propertyName in this._seed) {
                var propertyValue = this._seed[propertyName];
                if (typeof propertyValue === "function") { continue; }

                continueIteration = handler(propertyValue, propertyName);

                if (continueIteration === false) { break; }
            }
        }
    }
}