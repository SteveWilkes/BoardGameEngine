﻿import Ts = AgileObjects.TypeScript;
import Node = AgileObjects.Node;
import Angular = AgileObjects.Angular;
import Game = AgileObjects.StrategyGame.Game;

import FileManager = require("./Scripts/Generic/AgileObjects.Node.FileManager");
var fileManager = new FileManager(require("path"), require("fs"), require("temp").track(), require.main.filename);

import moduleLoaders = require("./Scripts/Generic/AgileObjects.TypeScript.InternalModuleLoaders");
var moduleLoader = moduleLoaders.forNode(fileManager, require);

var Ao = moduleLoader.load("AgileObjects.TypeScript", "AgileObjects.StrategyGame.Game");

var RandomStringGenerator: new () => Angular.Services.IIdGenerator =
    Ao.TypeScript.RandomStringGenerator;

var GetBoardTypeQuery: new () => Ts.IGetQuery<Game.Boards.BoardType> =
    Ao.StrategyGame.Game.Boards.GetBoardTypeQuery;

var GetGameTypeQuery: new (getBoardTypeQuery: Ts.IGetQuery<Game.Boards.BoardType>) => Ts.IGetQuery<Game.GameType> =
    Ao.StrategyGame.Game.GetGameTypeQuery;

var GameFactory: new (getGameTypeQuery: Ts.IGetQuery<Game.GameType>) => Game.GameFactory =
    Ao.StrategyGame.Game.GameFactory;

var ServerGameCoordinator: new (gameFactory: Game.GameFactory) => Game.ServerGameCoordinator =
    Ao.StrategyGame.Game.ServerGameCoordinator;

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

var serverGameCoordinator = new ServerGameCoordinator(new GameFactory(new GetGameTypeQuery(new GetBoardTypeQuery())));

var bootstrappers = [
    new CssGenerator(fileManager, stylus),
    new Router(routes),
    new ResourceBundler(),
    new SessionWrapper(express, new RandomStringGenerator(), sessionStore),
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