import express = require("express");

// GET home page
export function index(req: express.Request, res: express.Response) {
    res.render("index", {});
}