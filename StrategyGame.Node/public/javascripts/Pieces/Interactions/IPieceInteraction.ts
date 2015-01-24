module AgileObjects.StrategyGame.Pieces {

    export interface IPieceInteraction extends TypeScript.IEntity<string> {
        type: InteractionType;
        piece: Piece;
        path: Array<IPieceLocation>;
        location: IPieceLocation;
        complete(): void;
    }
}