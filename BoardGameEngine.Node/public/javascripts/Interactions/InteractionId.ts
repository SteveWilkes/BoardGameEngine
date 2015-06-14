module AgileObjects.BoardGameEngine.Interactions {

    export class InteractionId {
        constructor(
            public pieceId: string,
            private _type: InteractionType,
            private _startingPoint: string,
            private _interactionPoint: string) {

            this.signature =
            this.pieceId + ":" +
            this._type + ":" +
            this._startingPoint +
            ">" +
            this._interactionPoint;
        }

        static from(signature: string): InteractionId {
            var signatureElements = signature.split(":");
            var coordinateElements = signatureElements[2].split(">");

            return new InteractionId(
                signatureElements[0],
                parseInt(signatureElements[1]),
                coordinateElements[0],
                coordinateElements[1]);
        }

        public signature: string;
    }
}