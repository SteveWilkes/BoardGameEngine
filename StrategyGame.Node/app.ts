import Game = AgileObjects.StrategyGame.Game;

import fileManagerCtor = require("./Scripts/Generic/AgileObjects.Node.FileManager");
var fileManager = new fileManagerCtor(require("path"), require("fs"), require("temp").track(), require.main.filename);

import moduleLoaderCtor = require("./Scripts/Generic/AgileObjects.Node.InternalModuleLoader");
var moduleLoader = new moduleLoaderCtor(fileManager, require).forNamespace("AgileObjects.StrategyGame.Game");

var serverGameCoordinator = moduleLoader
    .load<new (socket: SocketIO.Socket) => Game.ServerGameCoordinator>("ServerGameCoordinator");

import socketFactory = require("socket.io");
import routes = require("./routes/index");
import stylus = require("stylus");

import cssGenerator = require("./Scripts/Startup/CssGenerator");
import communicationManager = require("./Scripts/Startup/CommunicationManager");
import router = require("./Scripts/Startup/Router");
import resourceBundler = require("./Scripts/Startup/ResourceBundler");

var bootstrappers = [
    new cssGenerator(fileManager, stylus),
    new communicationManager(socketFactory, socket => new serverGameCoordinator(socket)),
    new router(routes),
    new resourceBundler()
];

import nodeAppCtor = require("./NodeApp");
import http = require("http");

var nodeApp = new nodeAppCtor(
    fileManager,
    app => http.createServer(app),
    bootstrappers);

nodeApp.start();