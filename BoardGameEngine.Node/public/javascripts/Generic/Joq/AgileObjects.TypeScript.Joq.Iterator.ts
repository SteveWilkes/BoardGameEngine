module AgileObjects.TypeScript {
    var ignore = null;
    //type Predicate = Array<T>;

    export class JoqIterator<TItem, TResult> {
        constructor(
            private _seed: Object|Array<TItem>,
            private _handler: (item: TItem, index: string|number) => TResult) { }

        public select<TNewResult>(projection: (value: TResult) => TNewResult): JoqIterator<TItem, TNewResult> {
            var handler = (item: TItem, index: string|number) => {
                var result = this._handler(item, index);
                return projection(result);
            };
            return new JoqIterator(this._seed, handler);
        }

        public where(predicate: (item: TResult, index?: string|number) => boolean): JoqIterator<TItem, TResult> {
            var handlerSoFar = this._handler;
            this._handler = (item: TItem, index: string|number) => {
                var result = handlerSoFar(item, index);
                return predicate(result, index) ? result : ignore;
            };
            return this;
        }

        public first(predicate?: (item: TResult, index?: string|number) => boolean): TResult {
            var hasPredicate = typeof predicate === "function";
            var result = ignore;

            this._iterate((item: TItem, index: string|number) => {
                result = this._handler(item, index);
                if (hasPredicate) {
                    if (predicate(result, index)) { return false; }
                    return true;
                }
                return false;
            });

            if (result !== ignore) { return result; }

            throw new Error(hasPredicate ? "No matching item found" : "No properties to iterate");
        }

        public firstOrDefault(predicate?: (item: TResult, index?: string|number) => boolean): TResult;
        public firstOrDefault(defaultValue?: TResult): TResult;
        public firstOrDefault(predicate?: any, defaultValue?: TResult): TResult {
            var hasPredicate = typeof predicate === "function";

            if ((defaultValue == null) && !hasPredicate) {
                defaultValue = <TResult>predicate;
                predicate = null;
            }

            var result = null;

            this._iterate((item: TItem, index: string|number) => {
                result = this._handler(item, index);
                if (hasPredicate) {
                    if (predicate(result, index)) { return false; }
                    result = null;
                    return true;
                }
                return false;
            });

            // ReSharper disable once ExpressionIsAlwaysConst
            if (result === ignore) { result = null; }

            // ReSharper disable once ConditionIsAlwaysConst
            return result || defaultValue || null;
        }

        public toArray(): Array<TResult> {
            var results = new Array<TResult>();
            this._iterate((item: TItem, index: string|number) => {
                var result = this._handler(item, index);
                if (result !== ignore) { results.push(result); }
                return true;
            });
            return results;
        }

        private _iterate(handler: (value: TItem, index: string|number) => boolean) {
            var continueIteration;

            if (this._seed instanceof Array) {
                var array = <Array<TItem>>this._seed;
                var seedLength = array.length;
                for (var i = 0; i < seedLength; i++) {
                    continueIteration = handler(array[i], i);

                    if (continueIteration === false) { break; }
                }
                return;
            }

            for (var propertyName in this._seed) {
                var propertyValue = <TItem>this._seed[propertyName];
                if (typeof propertyValue === "function") { continue; }

                continueIteration = handler(propertyValue, propertyName);

                if (continueIteration === false) { break; }
            }
        }
    }
}