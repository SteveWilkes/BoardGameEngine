module AgileObjects.StrategyGame.Game {

    export module PieceMover {

        class Implementation {
            private _currentPieceMovement: PieceMovement;

            constructor(private _locationsByCoordinates: IPieceLocationDictionary, events: EventSet) {
                events.pieceSelected.subscribe((tile: IPieceLocation) => this._pieceSelected(tile));
                events.pieceMoved.subscribe((tile: IPieceLocation) => this._pieceMoved(tile));
                events.pieceDeselected.subscribe(() => this._pieceDeselected());
            }

            _pieceSelected(origin: IPieceLocation): boolean {
                var validDestinations = origin.piece.movementProfile.getValidDestinations(origin, this._locationsByCoordinates);
                this._currentPieceMovement = new PieceMovement(origin, validDestinations);

                return true;
            }

            _pieceMoved(destination: IPieceLocation): boolean {
                return this._currentPieceMovement.complete(destination);
            }

            _pieceDeselected(): boolean {
                this._currentPieceMovement.cancel();
                return true;
            }
        }

        export function create(tilesByCoordinates: AgileObjects.TypeScript.IStringDictionary<BoardTile>, events: EventSet): void {
            // ReSharper disable once WrongExpressionStatement
            new Implementation(tilesByCoordinates, events);
        }
    }
}