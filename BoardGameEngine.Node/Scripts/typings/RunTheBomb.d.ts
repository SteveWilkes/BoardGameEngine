declare module AgileObjects.BoardGameEngine {

    export module Games {

        export interface IGameSocket extends Nd.ISessionSocket {
            getGameRoomId(gameId: string): string;
            getGameOrNull(gameId: string): G.Game;
            addGame(game: G.Game): void;
            broadcastToGameRoom<TData>(eventName: string, data: TData, gameId: string): void;
        }

        export interface IGameSocketEventHandler extends Nd.ISocketEventHandler<IGameSocket> { }
    }
}