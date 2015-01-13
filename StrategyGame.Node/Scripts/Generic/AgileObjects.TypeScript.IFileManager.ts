module AgileObjects.TypeScript {

    export interface IPathInfo {
        isFile(): boolean;
        isDirectory(): boolean;
    }

    export interface IFilesFilter {
        extension?: string;
        exclude?: Array<string>;
    }

    export interface IFileManager {
        joinPaths(...paths: string[]): string;
        getAppRootDirectory(): string;
        getFileName(filePath: string): string;
        getPathToTempFile(extension?: string): string;
        getPathInfo(path: string): IPathInfo;
        getAllFilePaths(path: string, filter?: IFilesFilter): Array<string>;
        readAllText(filePath: string, fileEncoding?: string): string;
        writeAllText(filePath: string, fileContents: string): void;
    }
}