module AgileObjects.BoardGameEngine.Pieces.Evaluation {

    var replacers = {
        "bme(isOccupied)": new RegExp("\\bp.io\\b", "g"),
        "pe(definitionId,[$1])": new RegExp("\\bp.d=([0-9,]+)\\b", "g")
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