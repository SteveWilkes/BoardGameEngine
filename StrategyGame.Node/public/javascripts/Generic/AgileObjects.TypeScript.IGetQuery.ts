module AgileObjects.TypeScript {
    export interface IGetQuery<TEntity extends Object> {
        execute(entityId: string): TEntity;
    }
}