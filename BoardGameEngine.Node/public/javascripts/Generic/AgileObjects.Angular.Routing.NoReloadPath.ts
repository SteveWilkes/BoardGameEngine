module AgileObjects.Angular.Routing {

    var createNoReloadPathMethod = ["$route", "$rootScope", "$location", (
        routeService: ng.route.IRouteService,
        rootScope: ng.IRootScopeService,
        locationService) => {

        var original = locationService.path;
        locationService["path"] = (path: string, reload?: boolean) => {
            if (reload === false) {
                var lastRoute = routeService.current;
                var un = rootScope.$on('$locationChangeSuccess',() => {
                    routeService.current = lastRoute;
                    un();
                });
            }
            return <ng.ILocationService>original.call(locationService, path);
        };
    }];

    export function addNoReloadPath(angularModule: ng.IModule) {
        angularModule.run(createNoReloadPathMethod);
    }
}