module AgileObjects.TypeScript.Annotations {

    export interface IEntityAnnotation {
        creationEventName: string;
        symbol: string;
        name: string;
        apply(eventData: any);
    }
}