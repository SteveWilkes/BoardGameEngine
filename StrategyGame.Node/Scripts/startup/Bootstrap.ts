import http = require("http");
import express = require("express");

module Bootstrap {
    export class SystemInfo {
        constructor(
            public isReleaseMode: boolean,
            public publicRoot: string,
            public assetsRoot: string,
            public server: http.Server,
            public app: express.Express) {
            
            this.port = app.get("port");
        }

        public port: string;
    }

    export interface IBootstrapper {
        setup(info: SystemInfo): void;
    }
}

export = Bootstrap;