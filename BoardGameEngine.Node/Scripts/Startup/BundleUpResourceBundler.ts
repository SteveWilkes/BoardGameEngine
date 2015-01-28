import http = require("http");
import express = require("express");
import bundleUp = require("bundle-up");
import bs = require("Bootstrap");

class BundleUpResourceBundler implements bs.IBootstrapper {
    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        var assetsRoot = info.getPath("assets");
        var publicRoot = info.getPath("public");

        bundleUp(app, assetsRoot, {
            staticRoot: publicRoot,
            staticUrlRoot: "/",
            bundle: info.isReleaseMode,
            minifyCss: info.isReleaseMode,
            minifyJs: info.isReleaseMode
        });
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void { }
}

export = BundleUpResourceBundler;