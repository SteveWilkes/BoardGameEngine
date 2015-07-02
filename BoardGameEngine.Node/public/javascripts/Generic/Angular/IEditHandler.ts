module AgileObjects.Angular {

    "ClientOnly"
    export interface IEditHandler {
        handledItemName: string;
        prepareForEdit<TItem>(item: TItem);
        save<TItem>(item: TItem);
        cancel<TItem>(item: TItem);
    }
}