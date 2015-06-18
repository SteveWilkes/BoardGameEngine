import Node = AgileObjects.Node;
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
var sessionStore: Node.ISessionStore = new express.session["MemoryStore"]();

var IndexRoute = require("./Scripts/Routing/Routes/Index");
var GameIndexRoute = require("./Scripts/Routing/Routes/GameIndex");
var PlayerGetRoute = require("./Scripts/Routing/Routes/PlayerGet");

import CssGenerator = require("./Scripts/Startup/CssGenerator");
import Router = require("./Scripts/Routing/Router");
import ResourceBundler = require("./Scripts/Startup/BundleUpResourceBundler");
import SessionWrapper = require("./Scripts/Startup/SessionWrapper");
import CommunicationManager = require("./Scripts/Startup/CommunicationManager");

var routes = [
    new IndexRoute(),
    new GameIndexRoute(),
    new PlayerGetRoute()];

var patternMapper = new Bge.Games.GameEvaluatorPatternMapper();

var gameMapper = new Bge.Games.GameMapper(
    new Bge.Games.GameFactory(
        new Bge.Games.GetGameTypeQuery(
            new Bge.Games.GameTypeMapper(
                new Bge.Boards.GetBoardTypeQuery(),
                new Bge.Games.GameEntityAnnotationMapper(patternMapper),
                patternMapper))),
    new Bge.Teams.TeamFactory());

var getGameDataQuery = new Bge.Games.GetGameDataQuery(fileManager);
var saveGameCommand = new Bge.Games.SaveGameCommand(fileManager);

var serverEventHandlers = [
    new Bge.Games.PlayerJoinRequestedHandler(getGameDataQuery),
    new Bge.Games.GameStartedHandler(gameMapper, getGameDataQuery, saveGameCommand),
    new Bge.Games.TurnStartedHandler(),
    new Bge.Games.TurnEndedHandler(gameMapper, saveGameCommand)
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