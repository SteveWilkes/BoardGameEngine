import Node = AgileObjects.Node;
import Angular = AgileObjects.Angular;

require("./public/javascripts/Generic/AgileObjects.TypeScript.Extensions");

import FileManager = require("./Scripts/Generic/AgileObjects.Node.FileManager");
var fileManager = new FileManager(require("path"), require("fs"), require("temp").track(), require.main.filename);

var Ao: Typings.AgileObjectsNs = require("./InternalModules");
var Bge = Ao.BoardGameEngine;
var Ts = Ao.TypeScript;

import socketFactory = require("socket.io");
import routes = require("./routes/index");
import stylus = require("stylus");
import express = require("express");
var sessionStore: Node.ISessionStore = new express.session["MemoryStore"]();

import CssGenerator = require("./Scripts/Startup/CssGenerator");
import Router = require("./Scripts/Startup/Router");
import ResourceBundler = require("./Scripts/Startup/BundleUpResourceBundler");
import SessionWrapper = require("./Scripts/Startup/SessionWrapper");
import CommunicationManager = require("./Scripts/Startup/CommunicationManager");

var serverGameCoordinator = new Bge.Games.ServerGameCoordinator(
    new Bge.Games.GameFactory(
        new Bge.Games.GetGameTypeQuery(
            new Bge.Games.GameTypeMapper(
                new Bge.Boards.GetBoardTypeQuery(),
                new Bge.Games.GameEntityAnnotationMapper(
                    new Bge.Games.GameEvaluatorMapper())))),
    new Bge.Teams.TeamFactory());

var bootstrappers = [
    new CssGenerator(fileManager, stylus),
    new Router(routes),
    new ResourceBundler(),
    new SessionWrapper(
        express,
        new Ts.RandomStringGenerator(),
        sessionStore),
    new CommunicationManager(socketFactory(), sessionStore, serverGameCoordinator)
];

import NodeApp = require("./NodeApp");
import http = require("http");

var nodeApp = new NodeApp(fileManager, app => http.createServer(app), bootstrappers);

nodeApp.start();
/*
process.stdin.resume();//so the program will not close instantly

function exitHandler(err) {
    if (moduleLoader) {
        //moduleLoader.CleanUpConvertedSourceFile();
    }
    if (err) {
        console.log(err.stack);
    } else {
        process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null));*/