module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceOwner extends Ts.IEntity<string> {
        ownerId(): string;
        isLocal(): boolean;
        isHuman(): boolean;
        owns(piece: Piece): boolean;
    }
}