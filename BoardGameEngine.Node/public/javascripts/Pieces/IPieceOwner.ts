module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceOwner extends TypeScript.IEntity<string> {
        isLocal(): boolean;
        isHuman(): boolean;
        owns(piece: Piece): boolean;
    }
}