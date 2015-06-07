module AgileObjects.BoardGameEngine.Games {

    export class GameType implements Ts.IEntity<string> {
        constructor(
            public id: string,
            public boardType: B.BoardType,
            public maximumNumberOfTeams: number,
            public turnDefinition: I.TurnDefinition,
            public pieceData: P.PieceDataSet,
            public annotations: Array<Ts.Annotations.IEntityAnnotation>,
            public eventMappings: Array<Ts.EventMapping>) {

            this.escapedName = encodeURIComponent(this.id);
            var numberOfAddedDashes = 0;
            for (var i = 0; i < this.escapedName.length; ++i) {
                var character = this.id.charAt(i);
                var lowerCaseCharacter = character.toLowerCase();
                if (character !== lowerCaseCharacter) {
                    this.escapedName = this.escapedName.splice(i + numberOfAddedDashes, lowerCaseCharacter, 1);
                    if (i > 0) {
                        this.escapedName = this.escapedName.splice(i + numberOfAddedDashes, "-");
                        ++numberOfAddedDashes;
                    }
                    continue;
                }
            }

        }

        public escapedName: string;
    }
}