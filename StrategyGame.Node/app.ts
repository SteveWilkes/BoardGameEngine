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

import stylus = require("stylus");
app.use(stylus.middleware(path.join(__dirname, "public")));

var isRelease = process.env.NODE_ENV === "Release";

bundleUp(app, __dirname + "/assets", {
    staticRoot: __dirname + "/public/",
    staticUrlRoot: "/",
    bundle: isRelease,
    minifyCss: isRelease,
    minifyJs: isRelease
});

app.use(express.static(path.join(__dirname, "public")));

if (!isRelease) {
    app.use(express.errorHandler());
}

app.get("/", routes.index);

http.createServer(app).listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});
