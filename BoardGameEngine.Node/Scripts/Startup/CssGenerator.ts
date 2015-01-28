import http = require("http");
import express = require("express");
import stylus = require("stylus");
import bs = require("Bootstrap");
import Ts = AgileObjects.TypeScript;

class CssGenerator implements bs.IBootstrapper {
    constructor(
        private _fileManager: Ts.IFileManager,
        private _stylusFactory: (stylusData: string) => stylus.Stylus) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        if (info.isReleaseMode) { return; }

        var publicRoot = info.getPath("public");
        var stylesheets = ["site", "board-tile-attack-animation"];
        for (var i = 0; i < stylesheets.length; i++) {
            var inputFileName = "stylesheets/" + stylesheets[i] + ".styl";
            var inputFilePath = this._fileManager.joinPaths(publicRoot, inputFileName);
            var stylusData = this._fileManager.readAllText(inputFilePath);
            var stylusRenderer = this._stylusFactory(stylusData);

            stylusRenderer.render((stylusErr: Error, css: string) => {
                if (stylusErr) { throw stylusErr; }
                var outputFileName = "generated/stylesheets/" + stylesheets[i] + ".css";
                var outputFilePath = this._fileManager.joinPaths(publicRoot, outputFileName);
                this._fileManager.writeAllText(outputFilePath, css);
            });
        }

        console.log("Stylus CSS updated");
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void { }
}

export = CssGenerator