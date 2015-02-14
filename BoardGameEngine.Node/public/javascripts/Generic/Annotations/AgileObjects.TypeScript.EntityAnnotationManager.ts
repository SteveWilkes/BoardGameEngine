module AgileObjects.TypeScript.Annotations {

    export module EntityAnnotationManager {
        class EntityAnnotationManager<TEventSet> {
            constructor(eventSet: TEventSet, annotations: Array<IEntityAnnotation>) {
                for (var eventName in eventSet) {
                    var eventHub = eventSet[eventName];
                    var handler = this._createHandler(annotations, eventName);
                    eventHub.subscribe(handler);
                }
            }

            private _createHandler(annotations: Array<IEntityAnnotation>, eventName: string) {
                return (eventData) => {
                    for (var i = 0; i < annotations.length; i++) {
                        if (annotations[i].creationEventName === eventName) {
                            annotations[i].apply(eventData);
                        }
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