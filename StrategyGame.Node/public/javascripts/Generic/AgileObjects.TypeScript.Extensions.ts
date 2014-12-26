interface String {
    splice(insertionIndex: number, substringToInsert: string, charactersToRemove?: number): string;
}

module AgileObjects.TypeScript {

    String.prototype.splice = function (insertionIndex, substringToInsert, charactersToRemove = 0) {
        var _this = <string>this;
        return _this.slice(0, insertionIndex) + substringToInsert + _this.slice(insertionIndex + Math.abs(charactersToRemove));
    };
} 