module AgileObjects.TypeScript {
    export interface ICommand<TEntity extends Object> {
        execute(entity: TEntity, callback: (err: Error) => void): void;
    }
}