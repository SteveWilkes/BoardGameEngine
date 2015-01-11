import path = require("path");
import fs = require("fs");
import stylus = require("stylus");
import bs = require("Bootstrap");

class CssGenerator implements bs.IBootstrapper {
    public setup(info: bs.SystemInfo): void {
        if (info.isReleaseMode) { return; }

        var stylesheets = ["site", "board-tile-attack-animation"];
        for (var i = 0; i < stylesheets.length; i++) {
            var inputFileName = "stylesheets/" + stylesheets[i] + ".styl";
            var inputFilePath = path.join(info.publicRoot, inputFileName);
            var stylusData = fs.readFileSync(inputFilePath, { encoding: "UTF8" });

            stylus(stylusData)
                .render((stylusErr: Error, css: string) => {
                    if (stylusErr) { throw stylusErr; }
                    var outputFileName = "generated/stylesheets/" + stylesheets[i] + ".css";
                    var outputFilePath = path.join(info.publicRoot, outputFileName);
                    fs.writeFileSync(outputFilePath, css);
                });
        }
        console.log("Stylus CSS updated");
    }
}

var factory = () => { return new CssGenerator(); };

export = factory;