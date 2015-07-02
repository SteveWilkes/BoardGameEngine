module AgileObjects.BoardGameEngine.Players {

    "ClientOnly"
    export class PlayerNameEditHandler implements Angular.IEditHandler {
        private _originalPlayerName: string;

        handledItemName = "localPlayerName";

        public prepareForEdit<TItem>(item: TItem): void {
            this._originalPlayerName = (<Player><Object>item).name;
        }

        public save<TItem>(item: TItem): void {
            GlobalEventSet.instance.playerNameUpdated.publish(<Player><Object>item);
            this._originalPlayerName = undefined;
        }

        public cancel<TItem>(item: TItem): void {
            (<Player><Object>item).name = this._originalPlayerName;
            this._originalPlayerName = undefined;
        }
    }
}