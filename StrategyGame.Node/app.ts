import Game = AgileObjects.StrategyGame.Game;
import Angular = AgileObjects.Angular;
import Node = AgileObjects.Node;

import FileManager = require("./Scripts/Generic/AgileObjects.Node.FileManager");
var fileManager = new FileManager(require("path"), require("fs"), require("temp").track(), require.main.filename);

import ModuleLoader = require("./Scripts/Generic/AgileObjects.Node.InternalModuleLoader");
var moduleLoader = new ModuleLoader(fileManager, require);

var ServerGameCoordinator = moduleLoader.load<new () => Game.ServerGameCoordinator>(
    "ServerGameCoordinator",
    "AgileObjects.StrategyGame.Game");

var RandomStringGenerator = moduleLoader
    .load<new () => Angular.Services.IIdGenerator>("AgileObjects.TypeScript.RandomStringGenerator");

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

var bootstrappers = [
    new CssGenerator(fileManager, stylus),
    new Router(routes),
    new ResourceBundler(),
    new SessionWrapper(express, new RandomStringGenerator(), sessionStore),
    new CommunicationManager(socketFactory(), sessionStore, new ServerGameCoordinator())
];

import NodeApp = require("./NodeApp");
import http = require("http");

var nodeApp = new NodeApp(fileManager, app => http.createServer(app), bootstrappers);

nodeApp.start();