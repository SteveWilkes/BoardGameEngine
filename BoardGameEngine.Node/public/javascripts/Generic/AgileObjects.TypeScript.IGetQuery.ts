module AgileObjects.TypeScript {
    export interface IGetQuery<TEntity extends Object> {
        execute<TGetData>(entityId: string, data?: TGetData): TEntity;
    }
}