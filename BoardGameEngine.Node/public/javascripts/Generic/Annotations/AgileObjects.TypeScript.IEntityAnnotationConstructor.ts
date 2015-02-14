module AgileObjects.TypeScript.Annotations {

    export interface IEntityAnnotationConstructor {
        new (entityIdentifier: string,
            annotationSymbol: string,
            annotationName: string,
            derivedAnnotationValuePath: Array<string>);
    }
}