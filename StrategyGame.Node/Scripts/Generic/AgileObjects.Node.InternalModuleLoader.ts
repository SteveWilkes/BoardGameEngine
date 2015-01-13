import Ts = AgileObjects.TypeScript;

class InternalModuleLoader {
    private _filePathsByFileName: Ts.IStringDictionary<string>;
    private _namespace: string;

    constructor(private _fileManager: Ts.IFileManager, private _moduleLoader: (moduleName: string) => any) { }

    private _getFilePathsByFileName(): Ts.IStringDictionary<string> {
        if (this._filePathsByFileName === undefined) {
            this._filePathsByFileName = {};

            var rootDirectory = this._fileManager.getAppRootDirectory();
            var filter = { extension: ".js", exclude: ["node_modules"] };
            var allFilePaths = this._fileManager.getAllFilePaths(rootDirectory, filter);

            for (var i = 0; i < allFilePaths.length; i++) {
                var fileName = this._fileManager.getFileName(allFilePaths[i]);
                var fileNameWithoutExtension = this._removeFileExtensionFrom(fileName);
                this._filePathsByFileName[fileNameWithoutExtension] = allFilePaths[i];
            }
        }

        return this._filePathsByFileName;
    }

    private _removeFileExtensionFrom(fileName: string): string {
        var dotIndex = fileName.lastIndexOf(".");
        return (dotIndex > -1) ? fileName.substring(0, dotIndex) : fileName;
    }

    public forNamespace(namespace: string): InternalModuleLoader {
        this._namespace = namespace;
        return this;
    }

    public load<TResult>(moduleName: string, namespace?: string): TResult {
        var moduleScriptWithExport = this._getScriptWithExport(namespace, moduleName);

        var tempModuleFilePath = this._fileManager.getPathToTempFile(".js");
        this._fileManager.writeAllText(tempModuleFilePath, moduleScriptWithExport);

        var loadedModule = this._moduleLoader(tempModuleFilePath);

        return <TResult>loadedModule;
    }

    private _getScriptWithExport(namespace: string, moduleName: string): string {
        var modulePath = this._getSourceFilePathOrThrow(moduleName);
        var moduleScript = this._fileManager.readAllText(modulePath);
        var exportPath = this._getExportPath(namespace, moduleName);
        var exportAssignment = "module.exports = " + exportPath + ";";

        moduleScript = this._insertExportAssignment(moduleScript, exportAssignment);

        return moduleScript;
    }

    private _getSourceFilePathOrThrow(moduleName: string): string {
        var filesPathsByFileName = this._getFilePathsByFileName();
        var sourceFilePath = filesPathsByFileName[moduleName];

        if (sourceFilePath !== undefined) {
            return sourceFilePath;
        }

        throw new Error("Unable to find source for module '" + moduleName + "'");
    }

    private _getExportPath(namespace: string, moduleName: string): string {
        var pathSegments = new Array<string>(moduleName);

        if (namespace !== undefined) {
            pathSegments.unshift(namespace);
        }

        if (this._namespace !== undefined) {
            pathSegments.unshift(this._namespace);
        }

        return pathSegments.join(".");
    }

    private _insertExportAssignment(moduleScript: string, exportAssignment: string): string {
        var moduleScriptEndIndex = moduleScript.lastIndexOf(";") + 1;
        return moduleScript.slice(0, moduleScriptEndIndex) + exportAssignment + moduleScript.slice(moduleScriptEndIndex);
    }
}

export = InternalModuleLoader;