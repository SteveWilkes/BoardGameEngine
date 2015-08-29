module AgileObjects.TypeScript {
    export interface IGetQuery<TEntity extends Object> {
        execute(entityId: string, callback: (err: Error, entity: TEntity) => void): void;
    }
}