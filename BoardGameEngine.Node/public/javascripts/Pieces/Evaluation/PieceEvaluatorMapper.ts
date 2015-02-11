module AgileObjects.BoardGameEngine.Pieces.Evaluation {

    export class PieceEvaluatorMapper {
        static INSTANCE = new PieceEvaluatorMapper();

        public map(pattern: string): string {
            return pattern;
        }
    }
}