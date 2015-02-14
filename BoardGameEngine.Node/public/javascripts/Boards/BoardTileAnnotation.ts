module AgileObjects.BoardGameEngine.Boards {

    export class BoardTileAnnotation extends TypeScript.Annotations.EntityAnnotationBase<Pieces.IPieceLocation, TeamAdditionData> {
        constructor(
            private _tileSignature: string,
            annotationSymbol: string,
            annotationName: string,
            derivedAnnotationValuePath: Array<string>) {

            super("teamAdded", annotationSymbol, annotationName, derivedAnnotationValuePath);
        }

        protected getEntity(eventData: Boards.TeamAdditionData): Pieces.IPieceLocation {
            var defaultTile = eventData.allTiles[this._tileSignature];
            var translatedTileCoordinates = eventData.position.translate(defaultTile.coordinates);
            return eventData.allTiles[translatedTileCoordinates.signature];
        }
    }
}