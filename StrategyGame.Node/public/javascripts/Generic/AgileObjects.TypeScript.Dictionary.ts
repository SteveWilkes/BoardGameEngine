module AgileObjects.TypeScript {

    export class Dictionary<TKey, TValue> {
        private _keys: Array<TKey>;
        private _values: Array<TValue>;

        constructor() {
            this._keys = new Array<TKey>();
            this._values = new Array<TValue>();

            this.count = 0;
        }

        public count: number;

        public add(key: TKey, value: TValue): Dictionary<TKey, TValue> {
            var getResult = this.tryGet(key);

            if (getResult.found) {
                throw Error("Key " + key + " already exists");
            }

            this._keys.push(key);
            this._values.push(value);
            ++this.count;

            return this;
        }

        public get(key: TKey): TValue {
            var getResult = this.tryGet(key);

            if (getResult.found) { return getResult.value; }

            throw Error("Unable to find value for key " + key);
        }

        public tryGet(key: TKey): TryGetResult<TValue> {
            var keyIndex = this._keys.indexOf(key);
            var value = (keyIndex > -1) ? this._values[keyIndex] : undefined;

            return new TryGetResult(value);
        }
    }

    export class TryGetResult<TValue> {
        constructor(public value: TValue) {
            this.found = (this.value !== undefined);
        }

        public found: boolean;
    }
} 