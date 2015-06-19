class FileManager implements Ts.IFileManager {
    private _appRootDirectory: string;

    constructor(private _path, private _fs, private _temp, appRootFileName: string) {
        this._appRootDirectory = this._path.dirname(appRootFileName);
    }

    public joinPaths(...paths: string[]): string {
        return this._path.join.apply(this._path, paths);
    }

    public getAppRootDirectory(): string {
        return this._appRootDirectory;
    }

    public fileExists(path: string): boolean {
        return this._fs.existsSync(path);
    }

    public getFileName(path: string): string {
        return this._path.basename(path);
    }

    public getPathToTempFile(extension?: string): string {
        var options = undefined;
        if (extension != null) { options = { suffix: extension }; }
        var tempFileData = this._temp.openSync(options);
        this._fs.closeSync(tempFileData.fd);
        return tempFileData.path;
    }

    public getPathInfo(path: string): Ts.IPathInfo {
        return this._fs.lstatSync(path);
    }

    public getAllFilePaths(path: string, filter?: Ts.IFilesFilter): Array<string> {
        if (filter.extension == null) { filter.extension = ""; }
        if (filter.exclude == null) { filter.exclude = []; }

        var allPaths: Array<string> = this._fs.readdirSync(path);
        var paths = new Array<string>();
        for (var i = 0; i < allPaths.length; i++) {
            var fullPath = this.joinPaths(path, allPaths[i]);
            var pathInfo = this.getPathInfo(fullPath);
            if (pathInfo.isFile()) {
                if (this._fileFilterIsSatisfied(this.getFileName(fullPath), filter)) {
                    paths.push(fullPath);
                }
                continue;
            }
            if (pathInfo.isDirectory()) {
                if (this._excludeFilterIsSatisfied(allPaths[i], filter)) {
                    var subDirectoryFilePaths = this.getAllFilePaths(fullPath, filter);
                    if (subDirectoryFilePaths.length > 0) {
                        paths = paths.concat(subDirectoryFilePaths);
                    }
                }
            }
        }
        return paths;
    }

    private _fileFilterIsSatisfied(filePath: string, filter: Ts.IFilesFilter): boolean {
        if ((filter.extension.length > 0) &&
            (filePath.indexOf(filter.extension) !== (filePath.length - filter.extension.length))) {
            return false;
        }
        return this._excludeFilterIsSatisfied(filePath, filter);
    }

    private _excludeFilterIsSatisfied(path: string, filter: Ts.IFilesFilter): boolean {
        return filter.exclude.indexOf(path) === -1;
    }

    public readAllText(filePath: string, fileEncoding = "UTF8"): string {
        return this._fs.readFileSync(filePath, { encoding: fileEncoding });
    }

    public writeAllText(filePath: string, fileContents: string): void {
        if (this.fileExists(filePath)) {
            this._fs.writeFileSync(filePath, fileContents);
        } else {
            var writeStream = this._fs.createWriteStream(filePath);
            writeStream.end(fileContents);
        }
    }

    public deleteFile(filePath: string): void {
        if (this.fileExists(filePath)) {
            this._tryDeleteFile(filePath);
        }
    }

    private _tryDeleteFile(filePath: string, attempt = 1) {
        try {
            this._fs.unlinkSync(filePath);
        } catch (err) {
            if (attempt < 3) {
                this._tryDeleteFile(filePath, ++attempt);
                return;
            }
            throw err;
        }
    }
}

export = FileManager;