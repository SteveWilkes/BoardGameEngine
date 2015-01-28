import InternalModuleLoaderBase = require("./AgileObjects.TypeScript.InternalModuleLoaderBase");
import Ts = AgileObjects.TypeScript;

class NodeInternalModuleLoader extends InternalModuleLoaderBase {
    constructor(fileManager: Ts.IFileManager, nodeRequire: (classSourceFilePath: string) => any) {
        super(fileManager, nodeRequire);
    }

    protected convertInternalModuleSource(script: string): string {
        var rootNamespaceMatch = super.getRootNamespaceDeclarationMatch(script);
        var exportAssignment = "\r\nmodule.exports = " + rootNamespaceMatch[1] + ";";
        var scriptEndIndex = script.lastIndexOf(";") + 1;
        return script.splice(scriptEndIndex, exportAssignment);
    }
}

export = NodeInternalModuleLoader;