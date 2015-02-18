module AgileObjects.TypeScript {

    var _noMapping = null;

    export class EventMapping {
        constructor(
            triggeringEvents: Array<EventHub<any>>,
            triggerEvaluator: Evaluation.IEvaluator<any>,
            triggeredEvent: EventHub<any>,
            triggeredEventDataMemberName: string) {

            var triggeredEventDataMemberNameParts = ((triggeredEventDataMemberName || "").length > 0)
                ? triggeredEventDataMemberName.split(".")
                : _noMapping;

            for (var i = 0; i < triggeringEvents.length; i++) {
                triggeringEvents[i].subscribe(eventData => {
                    if (triggerEvaluator.evaluate(eventData)) {
                        var triggeredEventData = (triggeredEventDataMemberNameParts !== _noMapping)
                            ? ValueParser.INSTANCE.getPropertyValue(eventData, triggeredEventDataMemberNameParts)
                            : eventData;

                        triggeredEvent.publish(triggeredEventData);
                    }
                    return true;
                });
            }
        }
    }
}