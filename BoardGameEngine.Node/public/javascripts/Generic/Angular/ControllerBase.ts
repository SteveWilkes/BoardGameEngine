module AgileObjects.Angular {

    "ClientOnly";
    export class ControllerBase {
        constructor(menuItems: Array<MenuItem>) {
            this.menu = new Menu(menuItems);
        }

        public menu: Menu;
    }
}