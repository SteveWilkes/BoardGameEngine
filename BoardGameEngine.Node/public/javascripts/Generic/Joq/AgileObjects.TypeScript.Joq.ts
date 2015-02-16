module AgileObjects.TypeScript {

    export class Joq {
        static first<TResult>(seed: Object): TResult {
            return new JoqIterator(seed, (propertyValue: TResult) => propertyValue).first();
        }

        static toArray<TItem, TResult>(seed: Array<TItem>, handler: (item: TItem) => TResult): Array<TResult>;
        static toArray<TResult>(seed: Object): Array<TResult>;
        static toArray<TResult>(seed: any, handler?: (item: any) => TResult): Array<TResult> {
            if (handler === undefined) {
                handler = (propertyValue: TResult) => propertyValue;
            }
            return new JoqIterator(seed, handler).toArray();
        }

        static select<TResult>(seed: Object, projection?: (propertyValue: any, propertyName?: string) => TResult): JoqIterator<any, TResult>;
        static select<TItem, TResult>(seed: Array<TItem>, projection: (item: TItem, index?: number) => TResult): JoqIterator<TItem, TResult>;
        static select<TItem, TResult>(seed: any, projection: (enumerableValue: any, enumerableIndex?: any) => TResult): JoqIterator<TItem, TResult> {
            if (projection == null) {
                projection = v => <TResult>v;
            }
            return new JoqIterator(seed, projection);
        }
    }
}