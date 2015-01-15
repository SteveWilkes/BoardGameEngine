import http = require("http");
import express = require("express");
import Ts = AgileObjects.TypeScript;

export class SystemInfo {
    private _rootDirectory: string;

    constructor(private _fileManager: Ts.IFileManager, public isReleaseMode: boolean) {
        this._rootDirectory = this._fileManager.getAppRootDirectory();
    }

    public getPath(relativePath: string) {
        return this._fileManager.joinPaths(this._rootDirectory, relativePath);
    }
}

export interface IBootstrapper {
    appCreated(info: SystemInfo, app: express.Express): void;
    serverCreated(info: SystemInfo, server: http.Server): void;
}