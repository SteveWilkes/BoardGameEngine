module AgileObjects.BoardGameEngine.Pieces.Evaluation {

    var matchers: Ts.IStringDictionary<RegExp> = {
        "bme{$1isOccupied}": new RegExp("\\b((?:[lpt]\\.)*)io\\b", "g"),
        "pe{$1definitionId,[$2]}": new RegExp("\\b((?:[lpt]\\.)*)d=([0-9,a-z\\.D:]+)\\b", "g"),
        "pe{$1id,[$2]}": new RegExp("\\b((?:[lpt]\\.)*)id=([0-9,a-z\\.D:]+)\\b", "g"),
        "piece.": new RegExp("\\bp\\.", "g"),
        "team.": new RegExp("\\bt\\.", "g"),
        "location.": new RegExp("\\bl\\.", "g")
    };

    export class PieceEvaluatorMapper {
        static INSTANCE = new PieceEvaluatorMapper();

        public map(pattern: string): string {
            for (var replacement in matchers) {
                var matcher = matchers[replacement];
                pattern = pattern.replace(matcher, replacement);
            }
            return pattern;
        }
    }
}