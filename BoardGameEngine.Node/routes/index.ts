import express = require("express");

// GET home page
export function gameIndex(req: express.Request, res: express.Response) {
    res.render("Games/game", {});
}