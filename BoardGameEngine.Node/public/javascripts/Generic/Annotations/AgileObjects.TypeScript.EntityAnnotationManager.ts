module AgileObjects.TypeScript.Annotations {

    export module EntityAnnotationManager {
        class EntityAnnotationManager<TEventSet> {
            private _annotationsByEventName: Ts.Dictionary<string, Array<IEntityAnnotation>>;

            constructor(eventSet: TEventSet, annotations: Array<IEntityAnnotation>) {
                this._annotationsByEventName = new Dictionary<string, Array<IEntityAnnotation>>();

                for (var i = 0; i < annotations.length; i++) {
                    var annotation = annotations[i];
                    var eventName = annotation.creationEventName;

                    var eventAnnotations = this._annotationsByEventName
                        .getOrAdd(eventName, name => {
                            var eventHub = eventSet[name];
                            var handler = this._createHandler(name);
                            eventHub.subscribe(handler);

                            return new Array<IEntityAnnotation>();
                        });

                    eventAnnotations.push(annotation);
                }
            }

            private _createHandler(eventName: string) {
                return eventData => {
                    var annotations = this._annotationsByEventName.get(eventName);
                    for (var i = 0; i < annotations.length; i++) {
                        annotations[i].apply(eventData);
                    }
                    return true;
                };
            }
        }

        export var create = <TEventSet>(eventSet: TEventSet, annotations: Array<IEntityAnnotation>) => {
            new EntityAnnotationManager<TEventSet>(eventSet, annotations);
        }
    }
}