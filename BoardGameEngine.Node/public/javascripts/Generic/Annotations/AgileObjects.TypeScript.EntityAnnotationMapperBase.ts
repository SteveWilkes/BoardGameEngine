module AgileObjects.TypeScript.Annotations {

    export class EntityAnnotationMapperBase {
        constructor(
            private _patternExpander: Evaluation.IEvaluatorPatternExpander,
            private _annotationsBySymbol: IStringDictionary<IEntityAnnotationConstructor>) { }

        public map(annotationData: string): Ts.Annotations.IEntityAnnotation {
            var annotationDataItems = annotationData.split("^");

            var annotationType = annotationDataItems[0];
            var entityIdentifier = annotationDataItems[1];
            var annotationSymbol = annotationDataItems[2];
            var annotationName = annotationDataItems[3];
            var rawDerivedAnnotationValuePath = annotationDataItems[4];
            var mappedDerivedAnnotationValuePath = this._patternExpander.expand(rawDerivedAnnotationValuePath);
            var derivedAnnotationValuePath = mappedDerivedAnnotationValuePath.split(".");

            var annotation = this._annotationsBySymbol[annotationType];

            return new annotation(
                entityIdentifier,
                annotationSymbol,
                annotationName,
                derivedAnnotationValuePath);
        }
    }
}