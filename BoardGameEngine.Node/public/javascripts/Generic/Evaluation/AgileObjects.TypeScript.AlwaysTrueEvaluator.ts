module AgileObjects.TypeScript.Evaluation {

    export class AlwaysTrueEvaluator<T> implements IEvaluator<T> {
        static INSTANCE = new AlwaysTrueEvaluator();

        public evaluate(item: T): boolean {
            return true;
        }
    }
}