import Ts = AgileObjects.TypeScript;

require("../../public/javascripts/Generic/AgileObjects.TypeScript.Extensions");

// #region Dependency Finders

class RegexClassFinderBase {
    private _regex: RegExp;

    constructor(regexPattern: string) {
        this._regex = new RegExp(regexPattern, "g");
    }

    protected getMatches(className: string, classScript: string): Ts.IStringDictionary<RegExpExecArray> {
        var matches: Ts.IStringDictionary<RegExpExecArray> = {};
        var match: RegExpExecArray;
        var foundClassNames = new Array<string>("Array", "RegExp", "Error", className);
        while (match = this._regex.exec(classScript)) {
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

    public classData: ClassData;
}

class InstantiationFinder extends RegexClassFinderBase {
    constructor() {
        super("[=\\b]?new (_?[A-Z]{1}[a-zA-Z0-9_\\.]+)\\(");
    }

    public getInstantiations(className: string, classScript: string): Array<Instantiation> {
        var instantiationMatches = super.getMatches(className, classScript);
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
        public usages: Array<ImportUsage>) { }

    public classData: ClassData;
}

class ImportUsage {
    constructor(public usage) { }

    public classData: ClassData;
}

var memberCharactersOnly = new RegExp("[^a-zA-Z0-9\\._]+", "g");

class ImportFinder extends RegexClassFinderBase {
    constructor() {
        super("var [A-Z]{1}[a-zA-Z0-9_]+ ?= ?((?:[A-Z]{1}[a-zA-Z0-9_]+\\.)+[A-Z]{1}[a-zA-Z0-9_]+);");
    }

    static INSTANCE = new ImportFinder();

    public getImports(className: string, classScript: string): Array<Import> {
        var importMatches = super.getMatches(className, classScript);
        var imports = new Array<Import>();

        for (var importedSymbolPath in importMatches) {
            var importMatch = importMatches[importedSymbolPath];
            var importVariableName = importMatch[0].split(" ")[1];
            if (importVariableName === className) { continue; }
            var importPath = importMatch[1];
            var importUsageFinder = new RegExp("\\b(new )?(" + importVariableName + "[\\.\\[\\(]{1}[^\\(;,]+[\\(;,]{1})", "g");
            var importUsages = new Array<ImportUsage>();
            var loggedImportUsages = new Array<string>();
            var match: RegExpExecArray;
            while (match = importUsageFinder.exec(classScript)) {
                var importUsage = match[2];
                if ((match[1] === "new ") || (loggedImportUsages.indexOf(importUsage) !== -1)) {
                    continue;
                }
                loggedImportUsages.push(importUsage);
                importUsages.push(new ImportUsage(importUsage.replace(memberCharactersOnly, "")));
            }
            imports.push(new Import(importMatch[0], importVariableName, importPath, importUsages));
        }

        return imports;
    }
}

// #endregion

// #region ClassData

var namespaceSegmentMatcher = new RegExp("^[ \\t]*var ([A-Z]{1}[a-zA-Z0-9_]+);[^\\(]+^[ \\t]*\\(function ?\\(_?\\1\\) ?\\{", "gm");
var classNameMatcher = new RegExp("var ([A-Z]{1}[a-zA-Z0-9_]+) ?= ?\\(function ?\\((?:_super)?\\)");
var enumNameMatcher = new RegExp("\\(function ?\\(([A-Z]{1}[a-zA-Z0-9_]+)\\) ?\\{[^ \\t]+[ \\t]*\\1\\[\\1\\[");

class ClassData {
    constructor(
        public name: string,
        public namespaceSegments: Array<string>,
        public script: string,
        public instantiations: Array<Instantiation>,
        public imports: Array<Import>) {

        this.namespace = this.namespaceSegments.join(".");
        this.fullName = this.namespace + "." + this.name;
    }

    static from(classScript: string): ClassData {
        var namespaceSegments = new Array<string>();
        var match: RegExpExecArray, lastMatchIndex = 0;
        while (match = namespaceSegmentMatcher.exec(classScript)) {
            lastMatchIndex = namespaceSegmentMatcher.lastIndex;
            namespaceSegments.push(match[1]);
        }

        if (namespaceSegments.length === 0) { return null; }

        var remainingScript = classScript.substring(lastMatchIndex);
        var classNameMatch = classNameMatcher.exec(remainingScript) || enumNameMatcher.exec(remainingScript);

        if (classNameMatch == null) { return null; }

        var className = classNameMatch[1];

        return new ClassData(
            className,
            namespaceSegments,
            classScript,
            InstantiationFinder.INSTANCE.getInstantiations(className, classScript),
            ImportFinder.INSTANCE.getImports(className, classScript));
    }

    public namespace: string;
    public fullName: string;
    public convertedScript: string;
    public classTempFilePath: string;

    public hasNamespaceSegmentNamed(name: string) {
        return this.namespaceSegments.indexOf(name) > -1;
    }

    public getDependencies(): Array<ClassData> {
        var dependencies = new Array<ClassData>();
        var i;
        for (i = 0; i < this.instantiations.length; i++) {
            dependencies.push(this.instantiations[i].classData);
        }
        for (i = 0; i < this.imports.length; i++) {
            for (var j = 0; j < this.imports[i].usages.length; j++) {
                if (this.imports[i].usages[j].classData !== undefined) {
                    dependencies.push(this.imports[i].usages[j].classData);
                }
            }
        }

        return dependencies;
    }

}

// #endregion

var rootNamespaceDeclarationFinder = new RegExp("^var [A-Z]{1}[a-zA-Z0-9_]+;$", "gm");

class InternalModuleLoaderBase {
    private _classDataByClassName: Ts.IStringDictionary<ClassData>;
    private _loadedClassesByName: Ts.IStringDictionary<Object>;

    constructor(private _fileManager: Ts.IFileManager, private _classLoader: (classSourceFilePath: string) => any) {
        this._loadedClassesByName = {};
    }

    public load<TResult>(className: string): TResult {
        if (this._loadedClassesByName[className] !== undefined) {
            return <TResult>this._loadedClassesByName[className];
        }

        var classData = this._getClassDataOrThrow(className);

        return <TResult>this._loadClassFrom(classData);
    }

    private _getClassDataOrThrow(targetClassName: string): ClassData {
        var classData = this._getClassDataFor(targetClassName);

        if (classData.length === 0) {
            throw new Error("Unable to find source for class '" + targetClassName + "'");
        }

        if (classData.length > 1) {
            throw new Error("Multiple sources found for class '" + targetClassName + "': " + classData.join(", "));
        }

        return classData[0];
    }

    private _getClassDataFor(targetClassName: string): Array<ClassData> {
        this._cacheClassDataIfRequired();

        var matchingClassData = new Array<ClassData>();
        var upperCaseTargetClassName = targetClassName.toUpperCase();
        for (var className in this._classDataByClassName) {
            var classFullName = "." + this._classDataByClassName[className].fullName.toUpperCase();
            if (classFullName.endsWith("." + upperCaseTargetClassName)) {
                matchingClassData.push(this._classDataByClassName[className]);
            }
        }

        return matchingClassData;
    }

    private _cacheClassDataIfRequired(): void {
        if (this._classDataByClassName !== undefined) { return; }

        this._classDataByClassName = {};

        var rootDirectory = this._fileManager.getAppRootDirectory();
        var filter = { extension: ".js", exclude: ["node_modules"] };
        var allFilePaths = this._fileManager.getAllFilePaths(rootDirectory, filter);
        var allClassNames = new Array<string>();

        for (var i = 0; i < allFilePaths.length; i++) {
            var classScript = this._fileManager.readAllText(allFilePaths[i]);
            var classData = ClassData.from(classScript);

            if (classData == null) { continue; }

            allClassNames.push(classData.name);
            this._classDataByClassName[classData.fullName.toUpperCase()] = classData;
        }

        for (var className in this._classDataByClassName) {
            this._mapDependenciesFor(this._classDataByClassName[className]);
        }
    }

    private _mapDependenciesFor(classData: ClassData): void {
        var i;
        for (i = 0; i < classData.instantiations.length; i++) {
            var instantiatedClassData = this._getClassDataOrThrow(classData.instantiations[i].className);
            classData.instantiations[i].classData = instantiatedClassData;
        }
        for (i = 0; i < classData.imports.length; i++) {
            var importItem = classData.imports[i];
            var finalImportPathSegment = importItem.path.substring(importItem.path.lastIndexOf(".") + 1);
            var importClassData = this._getClassDataFor(finalImportPathSegment);
            if (importClassData.length === 1) {
                importItem.classData = importClassData[0];
                continue;
            }
            for (var j = 0; j < importItem.usages.length; j++) {
                var importUsage = importItem.usages[j];
                var usageSegments = importUsage.usage.split(".");
                // The final segment is a method, constant, static member or class name
                // Previous segments could be class, member or namespace names
                for (var k = 0; k < usageSegments.length; k++) {
                    importClassData = this._getClassDataFor(usageSegments[k]);
                    if (importClassData.length === 1) {
                        importUsage.classData = importClassData[0];
                        break;
                    }
                }
            }
        }
    }

    private _loadClassFrom(classData: ClassData): Object {
        this._createSourceFileFor(classData);

        var loadedModule = this._loadedClassesByName[classData.name] = this._classLoader(classData.classTempFilePath);

        return loadedModule;
    }

    private _createSourceFileFor(classData: ClassData): void {
        if (!classData.convertedScript) {
            classData.convertedScript = "";
            var allRequiredClasses = this._getAllRequiredClasses(new Array<ClassData>(), classData);
            for (var i = 0; i < allRequiredClasses.length; i++) {
                classData.convertedScript += "\r\n\r\n" + allRequiredClasses[i].script;
            }
            classData.convertedScript += "\r\n\r\n" + classData.script;
            this.convertInternalModuleSource(classData);
        }

        this._removeDuplicateRootNamespaceDeclarations(classData);

        classData.classTempFilePath = this._fileManager.getPathToTempFile(".js");
        this._fileManager.writeAllText(classData.classTempFilePath, classData.convertedScript);
    }

    private _getAllRequiredClasses(allClasses: Array<ClassData>, classData: ClassData): Array<ClassData> {
        var dependencies = classData.getDependencies();
        for (var i = 0; i < dependencies.length; i++) {
            var dependency = dependencies[i];
            this._getAllRequiredClasses(allClasses, dependency);
            if (allClasses.indexOf(dependency) === -1) {
                allClasses.push(dependency);
            }
        }

        return allClasses;
    }

    protected convertInternalModuleSource(classData: ClassData) {
        throw new Error("Abstract convertInternalModuleSource() not implemented");
    }

    private _removeDuplicateRootNamespaceDeclarations(classData: ClassData): void {
        var declarationIndexes = new Array<number>(), declarationLength = 0;
        var match: RegExpExecArray;
        while (match = rootNamespaceDeclarationFinder.exec(classData.convertedScript)) {
            declarationLength = match[0].length;
            declarationIndexes.push(rootNamespaceDeclarationFinder.lastIndex - declarationLength);
        }
        for (var i = declarationIndexes.length - 1; i > 0; i--) {
            classData.convertedScript = classData.convertedScript.splice(declarationIndexes[i], "", declarationLength);
        }
    }

    public CleanUpConvertedSourceFiles(): void {
        for (var className in this._classDataByClassName) {
            this._cleanUpTempSourceFiles(this._classDataByClassName[className]);
        }
    }

    private _cleanUpTempSourceFiles(classData: ClassData): void {
        var dependencies = classData.getDependencies();
        for (var i = 0; i < dependencies.length; i++) {
            this._cleanUpTempSourceFiles(dependencies[i]);
        }

        if (classData.classTempFilePath !== undefined) {
            this._fileManager.deleteFile(classData.classTempFilePath);
            classData.classTempFilePath = undefined;
        }
    }
}

class NodeInternalModuleLoader extends InternalModuleLoaderBase {
    constructor(fileManager: Ts.IFileManager, nodeRequire: (classSourceFilePath: string) => any) {
        super(fileManager, nodeRequire);
    }

    protected convertInternalModuleSource(classData: ClassData) {
        //this._processInstantiations(classData);
        //this._processImports(classData);
        this._addExportAssignment(classData);
    }

    private _processInstantiations(classData: ClassData): void {
        for (var i = 0; i < classData.instantiations.length; i++) {
            var instantiation = classData.instantiations[i];
            var requireOp = this._insertRequireFor(instantiation.classData, classData);
            classData.script = classData.script.replaceAll("new " + instantiation.classReference, "new " + requireOp.variableName);
        }
    }

    private _processImports(classData: ClassData) {
        for (var i = 0; i < classData.imports.length; i++) {
            var importItem = classData.imports[i];
            if (importItem.classData !== undefined) {
                this._replaceClassImport(importItem, classData);
                continue;
            }
            classData.script = classData.script.replace(importItem.importStatement, "");
            for (var j = 0; j < importItem.usages.length; j++) {
                var importUsage = importItem.usages[j];
                var requireOp = this._insertRequireFor(importUsage.classData, classData);
                var usageToReplace: string;
                if (importUsage.classData.fullName.endsWith(importUsage.usage)) {
                    // Usage of a class from a namespace import
                    usageToReplace = importUsage.usage;
                } else {
                    usageToReplace = importUsage.usage.substring(0, importUsage.usage.lastIndexOf("."));
                }
                classData.script = classData.script.replaceAll(usageToReplace, requireOp.variableName);
            }
        }
    }

    private _replaceClassImport(importItem: Import, importingClassData: ClassData) {
        var requireOp = this._getRequireCall(importItem.classData, importingClassData);
        importingClassData.script = importingClassData.script.replace(importItem.importStatement, requireOp.call);
    }

    private _insertRequireFor(requiredClassData: ClassData, dependentClassData: ClassData) {
        var requireOp = this._getRequireCall(requiredClassData, dependentClassData);
        dependentClassData.script = requireOp.call + "\r\n" + dependentClassData.script;
        return requireOp;
    }

    private _getRequireCall(requiredClassData: ClassData, dependentClassData: ClassData) {
        var variableName = requiredClassData.name;
        if (dependentClassData.hasNamespaceSegmentNamed(requiredClassData.name)) {
            variableName = "_" + variableName;
        }

        var filePath = requiredClassData.classTempFilePath.replaceAll("\\", "/");

        return {
            variableName: variableName,
            call: "var " + variableName + " = require(\"" + filePath + "\");"
        };
    }

    private _addExportAssignment(classData: ClassData): void {
        var exportAssignment = "\r\nmodule.exports = " + classData.fullName + ";";
        var scriptEndIndex = classData.convertedScript.lastIndexOf(";") + 1;
        classData.convertedScript = classData.convertedScript.splice(scriptEndIndex, exportAssignment);
    }
}

var loaders = {
    forNode: (fileManager: Ts.IFileManager, nodeRequire: (classSourceFilePath: string) => any) => {
        return new NodeInternalModuleLoader(fileManager, nodeRequire);
    }
}

export = loaders;