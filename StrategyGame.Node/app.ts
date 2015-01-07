import express = require("express");
import bundleUp = require("bundle-up");
import routes = require("./routes/index");
import http = require("http");
import path = require("path");

var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

var isRelease = process.env.NODE_ENV === "Release";
var publicRoot = path.join(__dirname, "public");

if (!isRelease) {
    var fileSystem = require("fs");
    var stylus = require("stylus");
    var stylesheets = ["site", "animations"];
    for (var i = 0; i < stylesheets.length; i++) {
        var stylusData = fileSystem.readFileSync(
            path.join(publicRoot, "stylesheets/" + stylesheets[i] + ".styl"),
            { encoding: "UTF8" });
        stylus(stylusData)
            .render((stylusErr: Error, css: string) => {
                if (stylusErr) { throw stylusErr; }
                fileSystem.writeFileSync(path.join(publicRoot, "generated/stylesheets/" + stylesheets[i] + ".css"), css);
            });
    }
    console.log("Stylus CSS updated");
}

bundleUp(app, path.join(__dirname, "assets"), {
    staticRoot: path.join(__dirname, "public/"),
    staticUrlRoot: "/",
    bundle: isRelease,
    minifyCss: isRelease,
    minifyJs: isRelease
});

app.use(express.static(publicRoot));

if (!isRelease) {
    app.use(express.errorHandler());
}

app.get("/", routes.index);

http.createServer(app).listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});
