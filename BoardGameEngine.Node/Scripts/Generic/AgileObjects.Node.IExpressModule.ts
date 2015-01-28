import express = require("express")

interface IExpressModule {
    cookieParser(secret?: string): express.Handler;
    session(options?: any): express.Handler;
}

export = IExpressModule;