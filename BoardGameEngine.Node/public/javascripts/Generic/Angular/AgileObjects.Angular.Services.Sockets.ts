module AgileObjects.Angular.Services {

    export var $socketFactory = "$socketFactory";

    export function addSockets(angularModule: ng.IModule) {
        angularModule.factory($socketFactory, socketFactory => socketFactory());
    }
}