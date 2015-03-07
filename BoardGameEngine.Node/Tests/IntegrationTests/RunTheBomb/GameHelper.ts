require("../../../public/javascripts/generic/AgileObjects.TypeScript.Extensions");
var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;
var TsNs = Ao.TypeScript;

class GameHelper implements It.IGameHelper {
    public startDefaultGame(): G.Game {
        var gameService = new Bge.Games.GameService(
            new TsNs.RandomStringGenerator(),
            new Bge.Games.GameFactory(
                new Bge.Games.GetGameTypeQuery(
                    new Bge.Games.GameTypeMapper(
                        new Bge.Boards.GetBoardTypeQuery(),
                        new Bge.Games.GameEntityAnnotationMapper(
                            new Bge.Games.GameEvaluatorPatternMapper()),
                        new Bge.Games.GameEvaluatorPatternMapper()))),
            new Bge.Teams.TeamFactory());

        var game = gameService.createDefaultGame("1");
        game.start();

        return game;
    }

    public getPieceAt(coordinatesSignature: string, game: G.Game): P.Piece {
        try {
            return TsNs.Joq
                .select<Ts.IStringDictionary<P.Piece>>(game.teams, team => team.getPieces())
                .select(pieces => TsNs.Joq
                    .select<P.Piece>(pieces)
                    .firstOrDefault(piece => piece.location.coordinates.signature === coordinatesSignature))
                .first(p => p !== null);
        } catch (e) {
            throw new Error("No piece found at " + coordinatesSignature);
        }
    }

    public getInteractionAt(coordinatesSignature: string, piece: P.Piece, game: G.Game): P.IPieceInteraction;
    public getInteractionAt(targetPiece: P.Piece, piece: P.Piece, game: G.Game): P.IPieceInteraction;
    public getInteractionAt(coordinatesSignatureOrPiece: any, piece: P.Piece, game: G.Game): P.IPieceInteraction {
        var bombInteractions = piece.interactionProfile.getPotentialInteractions(piece, game);

        var predicate = (typeof coordinatesSignatureOrPiece === "string")
            ? inter => inter.location.coordinates.signature === coordinatesSignatureOrPiece
            : inter => inter.location.contains(coordinatesSignatureOrPiece);

        try {
            return TsNs.Joq
                .select<IPieceInteraction>(bombInteractions)
                .first(predicate);
        } catch (e) {
            throw new Error("No interaction found at " + coordinatesSignatureOrPiece);
        }
    }

    public signalTurnStartFor(team: T.Team, game: G.Game): void {
        game.events.turnValidated.publish(team);
    }
}

var gameHelper = new GameHelper();

export = gameHelper;