module AgileObjects.TypeScript.Annotations {

    export class EntityAnnotationBase<TEntity, TEventData> implements IEntityAnnotation {
        constructor(
            public creationEventName: string,
            public annotationSymbol: string,
            public annotationName: string,
            private _derivedAnnotationValuePath: Array<string>) {
        }

        public apply(eventData: TEventData) {
            var entity = this.getEntity(eventData);
            var annotationValue = ValueParser.INSTANCE.getPropertyValue(eventData, this._derivedAnnotationValuePath);
            entity[this.annotationName] = annotationValue;
        }

        protected getEntity(eventData: TEventData): TEntity {
            throw new Error("Abstract EntityAnnotationBase.getEntity not implemented");
        }
    }
}