module AgileObjects.Node {
    export interface IExpressHandler {
        (req: any, res: any, next?: Function): void;
    }

    export interface IExpressModule {
        cookieParser(secret?: string): IExpressHandler;
        session(options?: any): IExpressHandler;
    }
}