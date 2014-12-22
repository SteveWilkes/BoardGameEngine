module AgileObjects.StrategyGame.Game.Pieces {

    export module PieceInteractionMonitor {

        class Implementation {
            private _currentPieceMovement: PieceInteraction;

            constructor(events: EventSet) {
                events.pieceSelected.subscribe((location: IPieceLocation) => this._pieceSelected(location));
                events.pieceDeselected.subscribe((location: IPieceLocation) => this._pieceDeselected(location));
            }

            private _pieceSelected(location: IPieceLocation): boolean {
                var validDestinations = location.piece.movementProfile.getDestinations(location);
                var validTargets = location.piece.attackProfile.getTargetsByAttack(location);
                this._currentPieceMovement = new PieceInteraction(location, validDestinations, validTargets);

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