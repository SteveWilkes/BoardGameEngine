module AgileObjects.BoardGameEngine.Tests.IntegrationTests {

    export interface IGameHelper {
        startDefaultGame(): G.Game;
        getPieceAt(coordinatesSignature: string, game: G.Game): P.Piece;
        
        getInteractionAt(coordinatesSignature: string, piece: P.Piece, game: G.Game): P.IPieceInteraction;
        getInteractionAt(targetPiece: P.Piece, piece: P.Piece, game: G.Game): P.IPieceInteraction;
        getInteractionAt(coordinatesSignatureOrPiece: any, piece: P.Piece, game: G.Game): P.IPieceInteraction;
        
        hasInteractionAt(coordinatesSignature: string, piece: P.Piece, game: G.Game): boolean;
        hasInteractionAt(targetPiece: P.Piece, piece: P.Piece, game: G.Game): boolean;
        hasInteractionAt(coordinatesSignatureOrPiece: any, piece: P.Piece, game: G.Game): boolean;
        
        startNextTurn(game: G.Game): void;
    }
}