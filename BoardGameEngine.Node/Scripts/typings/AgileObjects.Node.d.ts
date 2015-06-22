declare module AgileObjects.Node {
    export interface ISessionStore {
        all(callback: (err: Error, contents: Array<Object>) => void): void;
        length(callback: Function): void;
        get(sessionId: string, callback: (err: Error, session: Object) => void): void;
        set(sessionId: string, session: Object, callback: Function): void;
        destroy(sessionId: string, callback: Function): void;
        clear(callback: Function): void;
        sessions: Object;
    }

    export interface ISessionSocket extends SocketIO.Socket {
        session: any;
    }

    export interface ISocketEventHandler<TSocket extends SocketIO.Socket> {
        setup(socket: TSocket): void;
    }
}