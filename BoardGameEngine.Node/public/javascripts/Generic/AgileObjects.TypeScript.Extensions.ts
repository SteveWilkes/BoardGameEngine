interface String {
    splice(insertionIndex: number, substringToInsert: string, charactersToRemove?: number): string;
    replaceAll(substringToReplace: string, replacement: string): string;
    startsWith(substring: string): boolean;
    endsWith(substring: string): boolean;
    withOwnership(): string;
}

interface Array<T> {
    remove(item: T): void;
    clear(): void;
}

module AgileObjects.TypeScript {

    String.prototype.splice = function (insertionIndex, substringToInsert, charactersToRemove = 0) {
        var _this = <string>this;
        return _this.slice(0, insertionIndex) + substringToInsert + _this.slice(insertionIndex + Math.abs(charactersToRemove));
    };

    String.prototype.replaceAll = function (substringToReplace: string, replacement: string) {
        var _this = <string>this;
        var substringIndex;
        while ((substringIndex = _this.indexOf(substringToReplace)) !== -1) {
            _this = _this.splice(
                substringIndex,
                replacement,
                substringToReplace.length);
        }
        return _this;
    }

    String.prototype.startsWith = function (substring: string) {
        var _this = <string>this;
        return _this.substring(0, substring.length) === substring;
    }

    String.prototype.endsWith = function (substring: string) {
        var _this = <string>this;
        return _this.substring(_this.length - substring.length) === substring;
    }

    String.prototype.withOwnership = function () {
        var _this = <string>this;
        return _this + (_this.endsWith("s") ? "'" : "'s");
    };

    Array.prototype.remove = function (item: any): void {
        var _this = <Array<any>>this;
        var itemIndex = _this.indexOf(item);
        if (itemIndex !== -1) {
            _this.splice(itemIndex, 1);
        }
    }

    Array.prototype.clear = function (): void {
        var _this = <Array<any>>this;
        while (_this.length > 0) {
            _this.pop();
        }
    }
} 