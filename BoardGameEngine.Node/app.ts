import Angular = AgileObjects.Angular;

require("./public/javascripts/Generic/AgileObjects.TypeScript.Extensions");

import FileManager = require("./Scripts/Generic/AgileObjects.Node.FileManager");
var fileManager = new FileManager(require("path"), require("fs"), require("temp").track(), require.main.filename);

var Ao: Typings.AgileObjectsNs = require("./InternalModules");
var Bge = Ao.BoardGameEngine;
var Ts = Ao.TypeScript;

import socketFactory = require("socket.io");
import stylus = require("stylus");
import express = require("express");

var sessionStore: Nd.ISessionStore = new express.session["MemoryStore"]();

import IndexRoute = require("./Scripts/Routing/Routes/Index");
import GameIndexRoute = require("./Scripts/Routing/Routes/GameIndex");
import PlayerGetRoute = require("./Scripts/Routing/Routes/PlayerGet");

import CssGenerator = require("./Scripts/Startup/CssGenerator");
import Router = require("./Scripts/Routing/Router");
import ResourceBundler = require("./Scripts/Startup/BundleUpResourceBundler");
import SessionWrapper = require("./Scripts/Startup/SessionWrapper");
import CommunicationManager = require("./Scripts/Startup/CommunicationManager");

var MongoClient = require("mongodb").MongoClient;

var mongoCallback = (callback: (db) => void) => {
    MongoClient.connect("mongodb://localhost:27017/boardgameengine", function (connectError, db) {
        if (connectError) {
            // TODO: Handle error
            return;
        }

        callback(db);
    });
}

import GetPlayerDataQuery = require("./Scripts/Players/QueryObjects/GetPlayerDataFromMongoQuery");
var getPlayerDataQuery = new GetPlayerDataQuery(mongoCallback);

import PlayerRepository = require("./Scripts/Players/PlayerRepository");
var playerRepository = new PlayerRepository(getPlayerDataQuery);

var routes = [
    new IndexRoute(),
    new GameIndexRoute(),
    new PlayerGetRoute(playerRepository)];

var patternMapper = new Bge.Games.GameEvaluatorPatternMapper();

var gameMapper = new Bge.Games.GameMapper(
    new Bge.Games.GameFactory(
        new Bge.Games.GetGameTypeQuery(
            new Bge.Games.GameTypeMapper(
                new Bge.Boards.GetBoardTypeQuery(),
                new Bge.Games.GameEntityAnnotationMapper(patternMapper),
                patternMapper))),
    new Bge.Teams.TeamFactory());

import GetGameDataQuery = require("./Scripts/Games/QueryObjects/GetGameDataFromFileQuery");
var getGameDataQuery = new GetGameDataQuery(fileManager);

import SaveGameCommand = require("./Scripts/Games/QueryObjects/SaveGameToFileCommand");
var saveGameCommand = new SaveGameCommand(fileManager);

import PlayerJoinRequestedHandler = require("./Scripts/Games/EventHandlers/PlayerJoinHandler");
import PlayerUpdateHandler = require("./Scripts/Games/EventHandlers/PlayerUpdateHandler");
import GameStartedHandler = require("./Scripts/Games/EventHandlers/GameLoadHandler");
import TurnEndedHandler = require("./Scripts/Games/EventHandlers/TurnEndedHandler");

var serverEventHandlers = [
    new PlayerJoinRequestedHandler(getGameDataQuery),
    new PlayerUpdateHandler(getGameDataQuery),
    new GameStartedHandler(gameMapper, getGameDataQuery),
    new TurnEndedHandler(gameMapper, saveGameCommand)
];

var bootstrappers = [
    new CssGenerator(fileManager, stylus),
    new Router(routes),
    new ResourceBundler(),
    new SessionWrapper(
        express,
        new Ts.RandomStringGenerator(),
        sessionStore),
    new CommunicationManager(socketFactory(), sessionStore, serverEventHandlers)
];

import NodeApp = require("./NodeApp");
import http = require("http");

var nodeApp = new NodeApp(fileManager, app => http.createServer(app), bootstrappers);

nodeApp.start();