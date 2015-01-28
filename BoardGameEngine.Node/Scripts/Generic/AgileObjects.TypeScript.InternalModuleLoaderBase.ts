import Ts = AgileObjects.TypeScript;

require("../../public/javascripts/Generic/AgileObjects.TypeScript.Extensions");

// #region Dependency Finders

class RegexClassFinderBase {
    private _regex: RegExp;

    constructor(regexPattern: string) {
        this._regex = new RegExp(regexPattern, "g");
    }

    protected getMatches(classData: ClassData): Ts.IStringDictionary<RegExpExecArray> {
        var matches: Ts.IStringDictionary<RegExpExecArray> = {};
        var match: RegExpExecArray;
        var foundClassNames = new Array<string>("Array", "RegExp", "Error", classData.name);
        while (match = this._regex.exec(classData.script)) {
            var foundClassName = match[1];
            if (foundClassNames.indexOf(foundClassName) === -1) {
                matches[foundClassName] = match;
                foundClassNames.push(foundClassName);
            }
        }
        return matches;
    }
}

class Instantiation {
    constructor(public className, public classReference) { }
}

class InstantiationFinder extends RegexClassFinderBase {
    constructor() {
        super("[=\\b]?new (_?[A-Z]{1}[a-zA-Z0-9_\\.]+)\\(");
    }

    public getInstantiations(classData: ClassData): Array<Instantiation> {
        var instantiationMatches = super.getMatches(classData);
        var instantiations = new Array<Instantiation>();
        for (var classReference in instantiationMatches) {
            var instantiatedClassName = classReference.substring(classReference.lastIndexOf(".") + 1);
            instantiations.push(new Instantiation(instantiatedClassName, classReference));
        }
        return instantiations;
    }

    static INSTANCE = new InstantiationFinder();
}

class Import {
    constructor(
        public importStatement: string,
        public variableName: string,
        public path: string,
        public usages: Array<string>) { }
}

var nonMemberCharacters = new RegExp("[^a-zA-Z0-9\\._]+", "g");
var staticImport = "(?:var ([A-Z]{1}[a-zA-Z0-9_]+))? ?= ?((?:[A-Z]{1}[a-zA-Z0-9_]+\\.)+[A-Z]{1}[a-zA-Z0-9_]+);";
var baseClassReference = "\\}\\)\\(([a-zA-Z0-9_\\.]+)\\);";

class ImportFinder extends RegexClassFinderBase {
    constructor() {
        super(staticImport + "|" + baseClassReference);
    }

    static INSTANCE = new ImportFinder();

    public getImports(classData: ClassData): Array<Import> {
        var importMatches = super.getMatches(classData);
        var imports = new Array<Import>();

        for (var importedSymbolPath in importMatches) {
            var importMatch = importMatches[importedSymbolPath];
            var importVariableName = importMatch[1];
            if (importVariableName === classData.name) { continue; }
            var importPath = importMatch[2];
            var importUsages = new Array<string>();
            if (importVariableName === undefined) {
                importPath = importPath || importMatch[3];
                importUsages.push(importPath);
            } else {
                var importUsageFinder = new RegExp("\\b(new )?(" + importVariableName + "[\\.\\[\\(]{1}[^\\(;,]+[\\(;,]{1})", "g");
                var loggedImportUsages = new Array<string>();
                var match: RegExpExecArray;
                while (match = importUsageFinder.exec(classData.script)) {
                    var importUsage = match[2];
                    if ((match[1] === "new ") || (loggedImportUsages.indexOf(importUsage) !== -1)) {
                        continue;
                    }
                    loggedImportUsages.push(importUsage);
                    importUsages.push(importUsage.replace(nonMemberCharacters, ""));
                }
            }
            imports.push(new Import(importMatch[0], importVariableName, importPath, importUsages));
        }

        return imports;
    }
}

// #endregion

// #region ClassData

var namespaceSegmentMatcher = new RegExp("^[ \\t]*var ([A-Z]{1}[a-zA-Z0-9_]+);[^\\(]+^[ \\t]*\\(function ?\\(_?\\1\\) ?\\{", "gm");
var classNamePattern = "var ([A-Z]{1}[a-zA-Z0-9_]+) ?= ?\\(function ?\\((?:_super)?\\)";
var enumNamePattern = "\\(function ?\\(([A-Z]{1}[a-zA-Z0-9_]+)\\) ?\\{[^ \\t]+[ \\t]*\\1\\[\\1\\[";
var classNameMatcher = new RegExp(classNamePattern + "|" + enumNamePattern);

class ClassData {
    constructor(public name: string, public namespace: string, public script: string) {
        this.fullName = this.namespace + "." + this.name;
    }

    static from(classScript: string): ClassData {
        if (classScript.indexOf("\"ClientOnly\"") !== -1) { return null; }

        var namespaceSegments = new Array<string>();
        var match: RegExpExecArray, lastMatchIndex = 0;
        while (match = namespaceSegmentMatcher.exec(classScript)) {
            lastMatchIndex = namespaceSegmentMatcher.lastIndex;
            namespaceSegments.push(match[1]);
        }

        if (namespaceSegments.length === 0) { return null; }

        var remainingScript = classScript.substring(lastMatchIndex);
        var classNameMatch = classNameMatcher.exec(remainingScript);

        if (classNameMatch == null) { return null; }

        var className = classNameMatch[1];

        return new ClassData(className, namespaceSegments.join("."), classScript);
    }

    public fullName: string;
    public dependencies: Array<ClassData>;
    public convertedScript: string;
}

// #endregion

var rootNamespaceDeclarationFinder = new RegExp("^var ([A-Z]{1}[a-zA-Z0-9_]+);$", "gm");

class InternalModuleLoaderBase {
    private _convertedSourceFilePath: string;

    constructor(private _fileManager: Ts.IFileManager, private _classLoader: (classSourceFilePath: string) => any) { }

    public load(...namespaces: Array<string>): any {
        this._convertedSourceFilePath = this._fileManager.getPathToTempFile(".js");
        this.createSourceFile(this._convertedSourceFilePath, namespaces);
        var loadedModule = this._classLoader(this._convertedSourceFilePath);

        return loadedModule;
    }

    public createSourceFile(sourceFilePath: string, namespaces: Array<string>): void {
        var allClassDataByClassName = this._getAllClassData(sourceFilePath);

        var allClasses = new Array<ClassData>();
        for (var className in allClassDataByClassName) {
            var classData = allClassDataByClassName[className];
            if (this._include(classData, namespaces)) {
                this._getAllRequiredClasses(allClasses, classData);
                if (allClasses.indexOf(classData) === -1) {
                    allClasses.push(classData);
                }
            }
        }

        this._createSourceFile(allClasses, sourceFilePath);
    }

    private _getAllClassData(sourceFilePath: string): Ts.IStringDictionary<ClassData> {
        var classDataByClassName: Ts.IStringDictionary<ClassData> = {};

        var rootDirectory = this._fileManager.getAppRootDirectory();
        var targetFileName = this._fileManager.getFileName(sourceFilePath);
        var filter = { extension: ".js", exclude: ["node_modules", targetFileName] };
        var allFilePaths = this._fileManager.getAllFilePaths(rootDirectory, filter);

        for (var i = 0; i < allFilePaths.length; i++) {
            var classScript = this._fileManager.readAllText(allFilePaths[i]);
            var classData = ClassData.from(classScript);

            if (classData == null) { continue; }

            classDataByClassName[classData.fullName.toUpperCase()] = classData;
        }

        for (var className in classDataByClassName) {
            this._mapDependenciesFor(classDataByClassName[className], classDataByClassName);
        }

        return classDataByClassName;
    }

    private _mapDependenciesFor(classData: ClassData, classDataByClassName: Ts.IStringDictionary<ClassData>): void {
        classData.dependencies = new Array<ClassData>();
        var instantiations = InstantiationFinder.INSTANCE.getInstantiations(classData);
        var i;
        for (i = 0; i < instantiations.length; i++) {
            var instantiatedClassData = this._getClassDataOrThrow(instantiations[i].className, classDataByClassName);
            classData.dependencies.push(instantiatedClassData);
        }
        var imports = ImportFinder.INSTANCE.getImports(classData);
        for (i = 0; i < imports.length; i++) {
            var importItem = imports[i];
            var finalImportPathSegment = importItem.path.substring(importItem.path.lastIndexOf(".") + 1);
            var importClassData = this._getClassDataFor(finalImportPathSegment, classDataByClassName);
            if (importClassData.length === 1) {
                classData.dependencies.push(importClassData[0]);
                continue;
            }
            for (var j = 0; j < importItem.usages.length; j++) {
                var usageSegments = importItem.usages[j].split(".");
                // The final segment is a method, constant, static member or class name
                // Previous segments could be class, member or namespace names
                for (var k = 0; k < usageSegments.length; k++) {
                    importClassData = this._getClassDataFor(usageSegments[k], classDataByClassName);
                    if (importClassData.length === 1) {
                        classData.dependencies.push(importClassData[0]);
                        break;
                    }
                }
            }
        }
    }

    private _getClassDataOrThrow(targetClassName: string, classDataByClassName: Ts.IStringDictionary<ClassData>): ClassData {
        var classData = this._getClassDataFor(targetClassName, classDataByClassName);

        if (classData.length === 0) {
            throw new Error("Unable to find source for class '" + targetClassName + "'");
        }

        if (classData.length > 1) {
            throw new Error("Multiple sources found for class '" + targetClassName + "': " + classData.join(", "));
        }

        return classData[0];
    }

    private _getClassDataFor(targetClassName: string, classDataByClassName: Ts.IStringDictionary<ClassData>): Array<ClassData> {
        var matchingClassData = new Array<ClassData>();
        var upperCaseTargetClassName = targetClassName.toUpperCase();
        for (var className in classDataByClassName) {
            var classFullName = "." + classDataByClassName[className].fullName.toUpperCase();
            if (classFullName.endsWith("." + upperCaseTargetClassName)) {
                matchingClassData.push(classDataByClassName[className]);
            }
        }

        return matchingClassData;
    }

    private _include(classData: ClassData, namespaces: Array<string>) {
        if (namespaces.length === 0) {
            return true;
        }

        for (var i = 0; i < namespaces.length; i++) {
            if (classData.fullName.startsWith(namespaces[i])) {
                return true;
            }
        }
        return false;
    }

    private _getAllRequiredClasses(allClasses: Array<ClassData>, classData: ClassData): Array<ClassData> {
        for (var i = 0; i < classData.dependencies.length; i++) {
            var dependency = classData.dependencies[i];
            if (allClasses.indexOf(dependency) === -1) {
                this._getAllRequiredClasses(allClasses, dependency);
                allClasses.push(dependency);
            }
        }

        return allClasses;
    }

    private _createSourceFile(allClasses: Array<ClassData>, sourceFilePath: string): void {
        var script = "";
        for (var i = 0; i < allClasses.length; i++) {
            console.log(allClasses[i].name + ": \t" + allClasses[i].script.length);
            script += allClasses[i].script + "\r\n\r\n";
        }

        script = this._removeDuplicateRootNamespaceDeclarations(script);
        var convertedScript = this.convertInternalModuleSource(script);

        this._fileManager.deleteFile(sourceFilePath);
        this._fileManager.writeAllText(sourceFilePath, convertedScript);
    }

    private _removeDuplicateRootNamespaceDeclarations(script: string): string {
        var declarationIndexes = new Array<number>(), declarationLength = 0;
        var match: RegExpExecArray;
        while (match = rootNamespaceDeclarationFinder.exec(script)) {
            declarationLength = match[0].length;
            declarationIndexes.push(rootNamespaceDeclarationFinder.lastIndex - declarationLength);
        }
        for (var i = declarationIndexes.length - 1; i > 0; i--) {
            script = script.splice(declarationIndexes[i], "", declarationLength);
        }
        return script;
    }

    protected convertInternalModuleSource(script: string): string {
        throw new Error("Abstract convertInternalModuleSource() not implemented");
    }

    public CleanUpConvertedSourceFile(): void {
        if (this._convertedSourceFilePath !== undefined) {
            this._fileManager.deleteFile(this._convertedSourceFilePath);
        }
    }

    protected getRootNamespaceDeclarationMatch(script: string): RegExpExecArray {
        return rootNamespaceDeclarationFinder.exec(script);
    }
}

export = InternalModuleLoaderBase;