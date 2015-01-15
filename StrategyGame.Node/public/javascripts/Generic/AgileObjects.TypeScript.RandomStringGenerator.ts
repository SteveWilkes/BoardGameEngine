module AgileObjects.TypeScript {
    export class RandomStringGenerator {
        public generate(length = 20): string {
            var str = this._getRandomString();
            while (str.length < length) {
                str += this._getRandomString();
            }
            return str.substring(0, length);
        }

        private _getRandomString() {
            return Math.random().toString(36).slice(2);
        }
    }
}