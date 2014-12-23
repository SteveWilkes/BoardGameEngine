module AgileObjects.StrategyGame.Game.Pieces {

    export module PieceInteractionMonitor {

        class Implementation {
            private _currentPieceMovement: PieceInteraction;

            constructor(events: EventSet) {
                events.pieceSelected.subscribe((piece: Piece) => this._pieceSelected(piece));
                events.pieceDeselected.subscribe((location: IPieceLocation) => this._pieceDeselected(location));
            }

            private _pieceSelected(piece: Piece): boolean {
                var validDestinations = piece.movementProfile.getDestinations(piece.location);
                var validTargets = piece.attackProfile.getTargetsByAttack(piece.location);
                this._currentPieceMovement = new PieceInteraction(piece.location, validDestinations, validTargets);

                return true;
            }

            private _pieceDeselected(location: IPieceLocation): boolean {
                if (this._currentPieceMovement !== undefined) {
                    this._currentPieceMovement.completeMovement(location);
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