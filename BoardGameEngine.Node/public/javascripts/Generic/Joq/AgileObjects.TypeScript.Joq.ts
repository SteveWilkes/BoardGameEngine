module AgileObjects.TypeScript {

    export class Joq {
        static select<TItem, TResult>(seed: Array<TItem>, projection: (item: TItem, index?: number) => TResult): JoqIterator<TItem, TResult>;
        static select<TResult>(seed: Object, projection?: (propertyValue: any, propertyName?: string) => TResult): JoqIterator<any, TResult>;
        static select<TItem, TResult>(seed: any, projection: (item: any, index?: any) => TResult): JoqIterator<TItem, TResult> {
            if (projection == null) {
                projection = v => <TResult>v;
            }
            return new JoqIterator(seed, projection);
        }

        static first<TItem>(seed: Array<TItem>, predicate?: (item: TItem, index?: number) => boolean): TItem;
        static first<TItem>(seed: Object, predicate?: (propertyValue: TItem, propertyName?: string) => boolean): TItem;
        static first<TItem>(seed: any, predicate: (item: TItem, index?: any) => boolean): TItem {
            return new JoqIterator(seed, (v: TItem) => v).first(predicate);
        }

        static toArray<TItem, TResult>(seed: Array<TItem>, handler: (item: TItem, index?: number) => TResult): Array<TResult>;
        static toArray<TItem>(seed: Object): Array<TItem>;
        static toArray<TItem>(seed: any, handler?: (item: TItem, index?: any) => TItem): Array<TItem> {
            if (handler === undefined) {
                handler = (item: TItem) => item;
            }
            return new JoqIterator(seed, handler).toArray();
        }
    }
}