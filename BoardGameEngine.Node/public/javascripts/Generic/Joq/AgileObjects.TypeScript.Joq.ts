module AgileObjects.TypeScript {

    export class Joq {
        static first<TResult>(seed: Object): TResult {
            return new JoqIterator(seed, (propertyValue: TResult) => propertyValue).first();
        }

        static select<TResult>(seed: Object, projection: (propertyValue: any, propertyName?: string) => TResult): JoqIterator<TResult>;
        static select<TItem, TResult>(seed: Array<TItem>, projection: (item: TItem, index?: number) => TResult): JoqIterator<TResult>;
        static select<TItem, TResult>(seed: any, projection: (enumerableValue: any, enumerableIndex?: any) => TResult): JoqIterator<TResult> {
            return new JoqIterator(seed, projection);
        }
    }
}