import Ts = AgileObjects.TypeScript;
import Node = AgileObjects.Node;
import Angular = AgileObjects.Angular;
import Game = AgileObjects.BoardGameEngine;

require("./public/javascripts/Generic/AgileObjects.TypeScript.Extensions");

import FileManager = require("./Scripts/Generic/AgileObjects.Node.FileManager");
var fileManager = new FileManager(require("path"), require("fs"), require("temp").track(), require.main.filename);

var Ao = require("./InternalModules");

var RandomStringGenerator: new () => Angular.Services.IIdGenerator =
    Ao.TypeScript.RandomStringGenerator;

var GetBoardTypeQuery: new () => Ts.IGetQuery<Game.Boards.BoardType> =
    Ao.StrategyGame.Boards.GetBoardTypeQuery;

var GetGameTypeQuery: new (getBoardTypeQuery: Ts.IGetQuery<Game.Boards.BoardType>) => Ts.IGetQuery<Game.Games.GameType> =
    Ao.StrategyGame.Games.GetGameTypeQuery;

var GameFactory: new (getGameTypeQuery: Ts.IGetQuery<Game.Games.GameType>) => Game.Games.GameFactory =
    Ao.StrategyGame.Games.GameFactory;

var PieceFactory: new () => Game.Pieces.PieceFactory =
    Ao.StrategyGame.Pieces.PieceFactory;

var TeamFactory: new (pieceFactory: Game.Pieces.PieceFactory) => Game.Teams.TeamFactory =
    Ao.StrategyGame.Teams.TeamFactory;

var ServerGameCoordinator:
    new (gameFactory: Game.Games.GameFactory, teamFactory: Game.Teams.TeamFactory) => Game.Games.ServerGameCoordinator =
    Ao.StrategyGame.Games.ServerGameCoordinator;

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

var serverGameCoordinator = new ServerGameCoordinator(
    new GameFactory(new GetGameTypeQuery(new GetBoardTypeQuery())),
    new TeamFactory(new PieceFactory()));

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