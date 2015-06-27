module AgileObjects.BoardGameEngine {

    "ClientOnly";
    export class ControllerBase {
        constructor(menuItems: Array<Ui.MenuItem>) {
            this.menu = new Ui.Menu(menuItems);
        }

        public menu: Ui.Menu;
    }
}