module AgileObjects.Angular.Services {

    export interface IIdGenerator {
        getId(length?: number): string;
    }

    export var $idGenerator = "$idGenerator";

    class IdGenerator implements IIdGenerator {
        public getId(length = 20): string {
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

    export function addIdGenerator(angularModule: ng.IModule) {
        angularModule.service($idGenerator, [IdGenerator]);
    }
}