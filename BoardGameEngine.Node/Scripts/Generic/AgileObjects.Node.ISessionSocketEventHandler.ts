import ISessionSocket = require("./AgileObjects.Node.ISessionSocket");

interface ISessionSocketEventHandler {
    setup(socket: ISessionSocket): void;
}

export = ISessionSocketEventHandler;