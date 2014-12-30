module AgileObjects.TypeScript {
    export interface IGetQuery<TEntity extends Object> {
        get(entityId: string): TEntity;
    }
}