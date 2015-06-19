﻿import http = require("http");
import express = require("express");
import IExpressModule = require("../Generic/AgileObjects.Node.IExpressModule");
import bs = require("Bootstrap");
import ISessionStore = require("../Generic/AgileObjects.Node.ISessionStore");

class SessionWrapper implements bs.IBootstrapper {
    constructor(
        private _express: IExpressModule,
        private _randomStringGenerator: AgileObjects.Angular.Services.IIdGenerator,
        private _sessionStore: ISessionStore) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        var cookieSecret = this._randomStringGenerator.generate(16);

        var sessionOptions = {
            key: "express.sid",
            store: this._sessionStore,
            cookie: { "path": "/", "httpOnly": true, maxAge: 60 * 60 * 1000 },
            secret: cookieSecret
        };

        var cookieParser = app["cookieParser"] = this._express.cookieParser(cookieSecret);

        app.use(cookieParser);
        app.use(this._express.session(sessionOptions));
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void { }
}

export = SessionWrapper;