module AgileObjects.BoardGameEngine.Interactions {

    export interface IPieceInteraction extends Ts.IEntity<string> {
        piece: Ts.IEntity<string>;
    }
}