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

            this.keys.push(key);
            this.values.push(value);
            ++this.count;

            return this;
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
    }

    export class TryGetResult<TValue> {
        constructor(public value: TValue) {
            this.found = (this.value !== undefined);
        }

        public found: boolean;
    }
} 