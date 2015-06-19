module AgileObjects.BoardGameEngine.Games {

    export class GameMapper {
        constructor(
            private _gameFactory: GameFactory,
            private _teamFactory: T.TeamFactory) {
        }

        public map(gameData: GameData): Game {
            var game = this._gameFactory.createNewGame(gameData.gameId, gameData.gameTypeId);

            var i;
            for (i = 0; i < gameData.playerData.length; i++) {
                var playerData = gameData.playerData[i];
                var player = new Players.Player(playerData.id, playerData.name, playerData.isHuman);
                game.add(player);

                for (var j = 0; j < playerData.numberOfTeams; j++) {
                    var team = this._teamFactory.createTeamFor(player, game);
                    game.board.add(team);
                }
            }

            var validateTurn = () => {
                // TODO: Deduplicate logic from TurnEndedHandler:
                var currentTeamIndex = game.teams.indexOf(game.status.turnManager.currentTeam);
                var nextTeamIndex = currentTeamIndex + 1;
                if (nextTeamIndex === game.teams.length) {
                    nextTeamIndex = 0;
                }
                return game.events.turnValidated.publish(game.teams[nextTeamIndex]);
            };

            game.start();
            game.events.turnEnded.subscribe(validateTurn);

            for (i = 0; i < gameData.historyData.length; i++) {
                var interactionId = Interactions.InteractionId.from(gameData.historyData[i]);
                this.completeInteraction(interactionId, game);
            }

            game.events.turnEnded.unsubscribe(validateTurn);

            return game;
        }

        public completeInteraction(interactionId: I.InteractionId, game: G.Game): void {
            var currentTeamPieces = game.status.turnManager.currentTeam.getPieces();
            if (!currentTeamPieces.hasOwnProperty(interactionId.pieceId)) {
                throw new Error(
                    "Interaction completion out of sync: " +
                    "expected pieces for team " + game.status.turnManager.currentTeam.id + ", " +
                    "got piece " + interactionId.pieceId);
            }
            var piece = currentTeamPieces[interactionId.pieceId];
            var potentialInteractions = piece.interactionProfile.getPotentialInteractions();
            if (!potentialInteractions.hasOwnProperty(interactionId.signature)) {
                throw new Error(
                    "Interaction completion out of sync: " +
                    "expected interactions for piece " + interactionId.pieceId + ", " +
                    "got interaction " + interactionId.signature);
            }
            potentialInteractions[interactionId.signature].complete();
        }
    }
}