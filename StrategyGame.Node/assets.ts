import bundleUp = require("bundle-up");

module.exports = (assets: bundleUp.IBundleUpAssets) => {
    assets.root = __dirname;

    assets.addCss("/public/stylesheets/site.styl");

    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.ScopeEvaluator.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.EventHub.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.RemoveClass.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.SizeToContainer.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.DragAndDrop.js");
    assets.addJs("/public/javascripts/Game.App.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardSizeDefaults.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardSizeManager.js");
    assets.addJs("/public/javascripts/Pieces/Game.Coordinates.js");
    assets.addJs("/public/javascripts/Teams/Game.BoardTileConfig.js");
    assets.addJs("/public/javascripts/Teams/Game.TeamStartingFormation.js");
    assets.addJs("/public/javascripts/Teams/Game.Team.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardTile.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardPosition.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardRowConfig.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardType.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardTypeRegistry.js");
    assets.addJs("/public/javascripts/Game.EventSet.js");
    assets.addJs("/public/javascripts/Pieces/Game.PieceMovement.js");
    assets.addJs("/public/javascripts/Game.TurnManager.js");
    assets.addJs("/public/javascripts/Pieces/Game.PieceMover.js");
    assets.addJs("/public/javascripts/Pieces/Game.PieceDefinition.js");
    assets.addJs("/public/javascripts/Pieces/Game.PieceFactory.js");
    assets.addJs("/public/javascripts/Pieces/Game.Piece.js");
    assets.addJs("/public/javascripts/Pieces/Game.AnyDirectionMovementProfile.js");
    assets.addJs("/public/javascripts/Boards/Game.BoardContainer.js");
    assets.addJs("/public/javascripts/Boards/Game.Board.js");
    assets.addJs("/public/javascripts/Game.Game.js");
    assets.addJs("/public/javascripts/Game.GameFactory.js");
    assets.addJs("/public/javascripts/Game.GameController.js");
}