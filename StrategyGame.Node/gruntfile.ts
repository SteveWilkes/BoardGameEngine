var gruntExport = grunt => {

    grunt.registerTask("default", "Compile Internal TypeScript Modules", () => {

        var path = require("path");
        var fs = require("fs");
        var temp = require("temp");
        var FileManager = require("./Scripts/Generic/AgileObjects.Node.FileManager");
        var moduleLoaders = require("./Scripts/Generic/AgileObjects.TypeScript.InternalModuleLoaders");

        var rootFileName = path.resolve("./app.js");
        var fileManager = new FileManager(path, fs, temp.track(), rootFileName);
        var moduleLoader = moduleLoaders.forNode(fileManager, require);

        moduleLoader.createSourceFile(
            "./InternalModules.js",
            ["AgileObjects.TypeScript", "AgileObjects.StrategyGame.Game"]);

        grunt.log.writeln("Internal TypeScript modules compiled.");
    });
};

export = gruntExport;