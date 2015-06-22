declare module "AgileObjects.Express" {
    import express = require("express");

    export interface IExpressModule {
        cookieParser(secret?: string): express.Handler;
        session(options?: any): express.Handler;
    }
}