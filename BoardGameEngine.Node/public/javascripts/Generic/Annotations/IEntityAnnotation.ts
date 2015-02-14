module AgileObjects.TypeScript.Annotations {

    export interface IEntityAnnotation {
        creationEventName: string;
        annotationSymbol: string;
        annotationName: string;
        apply(eventData: any);
    }
}