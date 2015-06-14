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

var patternMapper = new Bge.Games.GameEvaluatorPatternMapper();

var serverGameCoordinator = new Bge.Games.ServerGameCoordinator(
    new Bge.Games.GameFactory(
        new Bge.Games.GetGameTypeQuery(
            new Bge.Games.GameTypeMapper(
                new Bge.Boards.GetBoardTypeQuery(),
                new Bge.Games.GameEntityAnnotationMapper(patternMapper),
                patternMapper))),
    new Bge.Teams.TeamFactory(),
    new Bge.Games.GetGameDataQuery(fileManager),
    new Bge.Games.SaveGameCommand(fileManager));

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