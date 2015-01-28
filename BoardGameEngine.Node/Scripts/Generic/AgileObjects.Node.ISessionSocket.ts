module AgileObjects.Node {

    export interface ISessionSocket extends SocketIO.Socket {
        session: any;
    }
}