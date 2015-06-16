module AgileObjects.Node {

    export interface ISessionSocketEventHandler {
        setup(socket: Node.ISessionSocket): void;
    }
}