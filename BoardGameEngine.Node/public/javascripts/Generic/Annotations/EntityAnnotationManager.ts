module AgileObjects.TypeScript.Annotations {

    module EntityAnnotationManager {
        class EntityAnnotationManager<TEventSet> {
            constructor(eventSet: TEventSet, annotations: Array<IEntityAnnotation>) {
                for (var eventName in eventSet) {
                    var eventHub = eventSet[eventName];
                    eventHub.subscribe(eventData => {
                        for (var i = 0; i < annotations.length; i++) {
                            if (annotations[i].creationEventName === eventName) {
                                annotations[i].apply(eventData);
                            }
                        }
                    });
                }
            }
        }

        export var create = <TEventSet>(eventSet: TEventSet, annotations: Array<IEntityAnnotation>) => {
            new EntityAnnotationManager<TEventSet>(eventSet, annotations);
        }
    }
}