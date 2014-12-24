module AgileObjects.StrategyGame.Game.Pieces {

    export module PieceInteractionMonitor {

        class Implementation {
            private _currentTeam: IPieceOwner;
            private _currentPieceInteraction: PieceInteraction;

            constructor(events: EventSet) {
                events.turnStarted.subscribe((team: IPieceOwner) => this._turnStarted(team));
                events.pieceSelected.subscribe((piece: Piece) => this._pieceSelected(piece));
                events.pieceMoving.subscribe((piece: Piece) => this._pieceMoving(piece));
                events.pieceDeselected.subscribe((location: IPieceLocation) => this._pieceDeselected(location));
            }

            private _turnStarted(team: IPieceOwner): boolean {
                this._currentTeam = team;
                return true;
            }

            private _pieceSelected(piece: Piece): boolean {
                this._currentPieceInteraction = new PieceInteraction(piece, this._currentTeam);
                return true;
            }

            private _pieceMoving(piece: Piece): boolean {
                this._currentPieceInteraction.handlePieceMovement();
                return true;
            }

            private _pieceDeselected(location: IPieceLocation): boolean {
                if (this._currentPieceInteraction !== undefined) {
                    this._currentPieceInteraction.complete(location);
                    this._currentPieceInteraction = undefined;
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