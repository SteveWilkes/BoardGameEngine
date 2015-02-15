module AgileObjects.TypeScript.Annotations {

    export interface IEntityAnnotationMapper {
        map(annotationData: string): IEntityAnnotation;
    }
}