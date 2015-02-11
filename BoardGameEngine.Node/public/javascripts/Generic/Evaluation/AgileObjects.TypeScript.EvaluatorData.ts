module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorData {
        constructor(public type: string) {
            this.constructorArguments = new Array<any>();
        }

        public constructorArguments: Array<any>;
        public constructorArgument: any;

        public completeConstructorArgumentArray(match: RegExpExecArray, pattern: string): void {
            if (match.index > 0) {
                this.constructorArgument.push(pattern.substring(0, match.index));
            }
            var argumentArray = this.constructorArgument;
            this.constructorArgument = null;
            this.addConstructorArgument(argumentArray);
        }

        public completeConstructorArguments(match: RegExpExecArray, pattern: string): void {
            if (match.index > 0) {
                this.addConstructorArgument(pattern.substring(0, match.index));
            }
        }

        public addConstructorArgument(value: any) {
            ((this.constructorArgument instanceof Array)
                ? this.constructorArgument : this.constructorArguments).push(value);
        }
    }
}
