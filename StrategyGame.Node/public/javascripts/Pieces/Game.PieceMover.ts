module AgileObjects.StrategyGame.Game.Pieces {

    export module PieceMover {

        class Implementation {
            private _currentPieceMovement: PieceMovement;

            constructor(events: EventSet) {
                events.pieceSelected.subscribe((origin: IPieceLocation) => this._pieceSelected(origin));
                events.pieceMoved.subscribe((destination: IPieceLocation) => this._pieceMoved(destination));
                events.pieceDeselected.subscribe(() => this._pieceDeselected());
            }

            private _pieceSelected(origin: IPieceLocation): boolean {
                var validDestinations = origin.piece.movementProfile.getValidDestinations(origin);
                this._currentPieceMovement = new PieceMovement(origin, validDestinations);

                return true;
            }

            private _pieceMoved(destination: IPieceLocation): boolean {
                return this._currentPieceMovement.complete(destination);
            }

            private _pieceDeselected(): boolean {
                if (this._currentPieceMovement !== undefined) {
                    this._currentPieceMovement.cancel();
                }
                return true;
            }
        }

        export function create(events: EventSet): void {
            // ReSharper disable once WrongExpressionStatement
            new Implementation(events);
        }
    }
}