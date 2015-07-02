module AgileObjects.Angular {

    "ClientOnly"
    export class Menu {
        constructor(public items: Array<MenuItem>) {
            this.isOpen = false;
            this.selected = null;

            for (var i = 0; i < this.items.length; i++) {
                this[this.items[i].id] = this.items[i];
            }
        }

        public isOpen: boolean;
        public selected: MenuItem;

        public toggleOpen() {
            this.isOpen = !this.isOpen;
            if (!this.isOpen) { this.selected = null; }
        }

        public shouldShow(item: MenuItem) {
            return (this.selected === item) || (this.isOpen && this.selected === null);
        }

        public toggle(item: MenuItem) {
            this.selected = (this.selected !== item) ? item : null;
        }
    }
}