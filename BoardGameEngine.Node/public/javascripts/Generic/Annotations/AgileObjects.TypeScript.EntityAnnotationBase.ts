module AgileObjects.TypeScript.Annotations {

    export class EntityAnnotationBase<TEntity, TEventData> implements IEntityAnnotation {
        constructor(
            public creationEventName: string,
            public symbol: string,
            public name: string,
            private _derivedAnnotationValuePath: Array<string>) {
        }

        public apply(eventData: TEventData) {
            var entity = this.getEntity(eventData);
            var value = ValueParser.INSTANCE.getPropertyValue(eventData, this._derivedAnnotationValuePath);
            entity[this.name] = value;
        }

        protected getEntity(eventData: TEventData): TEntity {
            throw new Error("Abstract EntityAnnotationBase.getEntity not implemented");
        }
    }
}