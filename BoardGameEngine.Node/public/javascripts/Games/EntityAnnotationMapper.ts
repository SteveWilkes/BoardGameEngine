module AgileObjects.BoardGameEngine.Games {

    var annotationsBySymbol: Ts.IStringDictionary<Ts.Annotations.IEntityAnnotationConstructor> = {
        "bt": Boards.BoardTileAnnotation
    };

    export class EntityAnnotationMapper {
        static INSTANCE = new EntityAnnotationMapper();

        public map(annotationData: string): Ts.Annotations.IEntityAnnotation {
            var annotationDataItems = annotationData.split("^");

            var annotationType = annotationDataItems[0];
            var entityIdentifier = annotationDataItems[1];
            var annotationSymbol = annotationDataItems[2];
            var annotationName = annotationDataItems[3];
            var rawDerivedAnnotationValuePath = annotationDataItems[4];
            var mappedDerivedAnnotationValuePath = Pieces.Evaluation.PieceEvaluatorMapper.DEFAULT.expand(rawDerivedAnnotationValuePath);
            var derivedAnnotationValuePath = mappedDerivedAnnotationValuePath.split(".");

            var annotation = annotationsBySymbol[annotationType];

            return new annotation(
                entityIdentifier,
                annotationSymbol,
                annotationName,
                derivedAnnotationValuePath);
        }
    }
}