module AgileObjects.StrategyGame.Game.Pieces {

    export module PieceMovementMonitor {

        class Implementation {
            private _currentPieceMovement: PieceMovementTracker;

            constructor(events: EventSet) {
                events.pieceSelected.subscribe((origin: IPieceLocation) => this._pieceSelected(origin));
                events.pieceDeselected.subscribe((location: IPieceLocation) => this._pieceDeselected(location));
            }

            private _pieceSelected(origin: IPieceLocation): boolean {
                var validDestinations = origin.piece.movementProfile.getDestinations(origin);
                this._currentPieceMovement = new PieceMovementTracker(origin, validDestinations);

                return true;
            }

            private _pieceDeselected(location: IPieceLocation): boolean {
                if (this._currentPieceMovement !== undefined) {
                    this._currentPieceMovement.complete(location);
                    this._currentPieceMovement = undefined;
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