module AgileObjects.BoardGameEngine {

    "ClientOnly";
    export class ControllerBase {
        constructor(private _scope: ng.IScope, menuItems: Array<Ui.MenuItem>) {
            this.menu = new Ui.Menu(menuItems);
        }

        public menu: Ui.Menu;

        protected refreshUi() {
            this._scope.$apply();
        }
    }
}