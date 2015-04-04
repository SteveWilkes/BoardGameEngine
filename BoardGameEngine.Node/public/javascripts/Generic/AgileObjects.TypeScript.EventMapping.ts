module AgileObjects.TypeScript {

    var _doNothing = eventData => eventData;

    export class EventMapping {
        private _eventDataProcessor: (eventData: any) => any;

        constructor(
            private _triggeringEventNames: Array<string>,
            private _triggerEvaluator: Evaluation.IEvaluator<any>,
            private _triggeredEventName: string,
            triggeredEventDataPath: string) {

            if ((triggeredEventDataPath || "").length > 0) {
                var triggeredEventDataPathParts = triggeredEventDataPath.split(".");
                this._eventDataProcessor = eventData =>
                    ValueParser.INSTANCE.getPropertyValue(eventData, triggeredEventDataPathParts);
            } else {
                this._eventDataProcessor = _doNothing;
            }
        }

        public setup<TEventSet>(eventSet: TEventSet) {
            for (var i = 0; i < this._triggeringEventNames.length; i++) {
                var handler = this._createHandler(eventSet);
                eventSet[this._triggeringEventNames[i]].subscribe(handler);
            }
        }

        private _createHandler<TEventSet>(eventSet: TEventSet) {
            return eventData => {
                if (this._triggerEvaluator.evaluate(eventData)) {
                    var triggeredEventData = this._eventDataProcessor(eventData);
                    eventSet[this._triggeredEventName].publish(triggeredEventData);
                }
                return true;
            };
        }
    }
}