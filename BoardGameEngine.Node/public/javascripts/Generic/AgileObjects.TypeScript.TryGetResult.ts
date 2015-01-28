module AgileObjects.TypeScript {

    export class TryGetResult<TValue> {
        constructor(public value: TValue) {
            this.found = (this.value !== undefined);
        }

        public found: boolean;
    }
} 