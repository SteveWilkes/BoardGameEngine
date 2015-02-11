module AgileObjects.BoardGameEngine.Pieces.Evaluation {

    var replacers = {
        "bme($1isOccupied)": new RegExp("\\b(p\\.)?p.io\\b", "g"),
        "pe($1definitionId,[$2])": new RegExp("\\b(p\\.)?p.d=([0-9,]+)\\b", "g"),
        "piece.": new RegExp("\\bp\\.", "g")
    };

    export class PieceEvaluatorMapper {
        static INSTANCE = new PieceEvaluatorMapper();

        public map(pattern: string): string {
            for (var replacement in replacers) {
                var matcher = replacers[replacement];
                pattern = pattern.replace(matcher, replacement);
            }
            return pattern;
        }
    }
}