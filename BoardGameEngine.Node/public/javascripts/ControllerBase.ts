module AgileObjects.BoardGameEngine {

    "ClientOnly";
    export class ControllerBase {

        public menu = {
            selected: <string>null,
            toggle: function (section: string) {
                this.selected = (this.selected !== section) ? section : null;
            }
        };
    }
}