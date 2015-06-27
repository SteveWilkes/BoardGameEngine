module AgileObjects.BoardGameEngine {

    "ClientOnly";
    export class ControllerBase {

        public menu = {
            isOpen: false,
            selected: <string>null,
            toggleOpen: function () {
                this.isOpen = !this.isOpen;
                if (!this.isOpen) { this.selected = null; }
            },
            show: function (section: string) {
                return (this.selected === section) || (this.isOpen && this.selected === null);
            },
            toggle: function (section: string) {
                this.selected = (this.selected !== section) ? section : null;
            }
        };
    }
}