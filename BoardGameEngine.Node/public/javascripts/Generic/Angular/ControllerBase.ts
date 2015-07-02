module AgileObjects.Angular {

    "ClientOnly";
    export class ControllerBase {
        private _editHandlers: Ts.IStringDictionary<IEditHandler>;

        constructor(menuItems: Array<MenuItem>, editHandlers: Array<IEditHandler>) {
            this.menu = new Menu(menuItems);

            this._editHandlers = {};
            for (var i = 0; i < editHandlers.length; i++) {
                this._editHandlers[editHandlers[i].handledItemName] = editHandlers[i];
            }
        }

        public menu: Menu;
        public editing: string;

        public edit<TItem>(itemName: string, item: TItem): void {
            this._editHandlers[itemName].prepareForEdit(item);
            this.editing = itemName;
        }

        public save<TItem>(itemName: string, item: TItem): void {
            this._editHandlers[itemName].save(item);
            this.editing = undefined;
        }

        public cancel<TItem>(itemName: string, item: TItem): void {
            this._editHandlers[itemName].cancel(item);
            this.editing = undefined;
        }
    }
}