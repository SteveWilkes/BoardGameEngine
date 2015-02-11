module AgileObjects.TypeScript.Evaluation {

    export class EvaluatorSet<T> {
        public evaluator: IEvaluator<T>;
        public evaluators: Array<IEvaluator<T>>;
        public negate: boolean;

        public setToAnd(): void {
            this.evaluators = new Array<IEvaluator<T>>(this.evaluator);
            this.evaluator = new CompositeAndEvaluator(this.evaluators);
        }

        public setToOr(): void {
            this.evaluators = new Array<IEvaluator<T>>(this.evaluator);
            this.evaluator = new CompositeOrEvaluator(this.evaluators);
        }

        public add(ev: IEvaluator<T>): void {
            if (this.negate) {
                ev = new NegationEvaluator(ev);
                this.negate = false;
            }
            if (this.evaluators instanceof Array) {
                this.evaluators.push(ev);
            } else {
                this.evaluator = ev;
            }
        }
    }
}