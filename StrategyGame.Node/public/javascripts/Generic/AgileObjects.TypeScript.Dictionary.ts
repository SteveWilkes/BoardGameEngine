module AgileObjects.TypeScript {

    export class Dictionary<TKey, TValue> {
        constructor() {
            this.keys = new Array<TKey>();
            this.values = new Array<TValue>();

            this.count = 0;
        }

        public keys: Array<TKey>;
        public values: Array<TValue>;
        public count: number;

        public add(key: TKey, value: TValue): Dictionary<TKey, TValue> {
            var getResult = this.tryGet(key);

            if (getResult.found) {
                throw new Error("Key " + key + " already exists");
            }

            this._doAdd(key, value);

            return this;
        }

        private _doAdd(key: TKey, value: TValue): void {
            this.keys.push(key);
            this.values.push(value);
            ++this.count;
        }

        public get(key: TKey): TValue {
            var getResult = this.tryGet(key);

            if (getResult.found) { return getResult.value; }

            throw new Error("Unable to find value for key " + key);
        }

        public tryGet(key: TKey): TryGetResult<TValue> {
            var keyIndex = this.keys.indexOf(key);
            var value = (keyIndex > -1) ? this.values[keyIndex] : undefined;

            return new TryGetResult(value);
        }

        public getOrAdd(key: TKey, valueFactory: () => TValue): TValue {
            var getResult = this.tryGet(key);
            if (getResult.found) { return getResult.value; }
            var value = valueFactory();
            this._doAdd(key, value);
            return value;
        }

        public set(key: TKey, value: TValue): void {
            var keyIndex = this.keys.indexOf(key);
            this.values[keyIndex] = value;
        }
    }
} 