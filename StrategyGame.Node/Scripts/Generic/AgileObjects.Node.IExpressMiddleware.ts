import express = require("express")

interface IExpressMiddleware {
    (req: express.Request, res: express.Response, callback: (err: Error) => void): void;
}

export = IExpressMiddleware;