module AgileObjects.BoardGameEngine.Interactions {

    export interface IPiece extends Ts.IEntity<string> {
        team: P.IPieceOwner;
    }
}