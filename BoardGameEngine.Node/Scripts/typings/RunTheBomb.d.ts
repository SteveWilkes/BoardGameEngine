declare module AgileObjects.BoardGameEngine {

    export module Games {

        export interface IGameSocket extends Nd.ISessionSocket {
            getGameRoomId(gameId: string): string;
            getGameOrNull(gameId: string): G.Game;
            getGames(): Ts.IStringDictionary<G.Game>;
            addGame(game: G.Game): void;
            emitToGameListeners<TData>(eventName: string, data: TData, gameId: string): void;
            emitToGameRoom<TData>(eventName: string, data: TData, gameId: string): void;
        }

        export interface IGameSocketEventHandler extends Nd.ISocketEventHandler<IGameSocket> { }
    }
}