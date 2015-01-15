module AgileObjects.Angular.Services {

    export interface IIdGenerator {
        generate(length?: number): string;
    }

    export var $idGenerator = "$idGenerator";

    export function addIdGenerator(angularModule: ng.IModule) {
        angularModule.service($idGenerator, [TypeScript.RandomStringGenerator]);
    }
}