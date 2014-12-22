import bundleUp = require("bundle-up");

module.exports = (assets: bundleUp.IBundleUpAssets) => {
    assets.root = __dirname;

    assets.addCss("/public/stylesheets/site.styl");

    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.JQuery.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.ScopeEvaluator.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.Dictionary.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.EventHub.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.Coordinates.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.CoordinateTranslator.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.ScrollToBottom.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.SizeToContainer.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.DragAndDrop.js");
    assets.addJs("/public/javascripts/App.js");
    assets.addJs("/public/javascripts/Boards/BoardSizeDefaults.js");
    assets.addJs("/public/javascripts/Boards/BoardDisplayManager.js");
    assets.addJs("/public/javascripts/Pieces/PieceLocationConfigData.js");
    assets.addJs("/public/javascripts/Players/IPlayer.js");
    assets.addJs("/public/javascripts/Boards/BoardTile.js");
    assets.addJs("/public/javascripts/Boards/BoardPosition.js");
    assets.addJs("/public/javascripts/Boards/BoardRowConfig.js");
    assets.addJs("/public/javascripts/Boards/BoardOrientationTranslator.js");
    assets.addJs("/public/javascripts/Boards/BoardType.js");
    assets.addJs("/public/javascripts/Boards/BoardTypeRegistry.js");
    assets.addJs("/public/javascripts/Pieces/PieceMovement.js");
    assets.addJs("/public/javascripts/EventSet.js");
    assets.addJs("/public/javascripts/Pieces/PieceMovementProfile.js");
    assets.addJs("/public/javascripts/Pieces/PieceInteraction.js");
    assets.addJs("/public/javascripts/Pieces/PieceInteractionMonitor.js");
    assets.addJs("/public/javascripts/Status/TurnManager.js");
    assets.addJs("/public/javascripts/Status/PieceMoveAction.js");
    assets.addJs("/public/javascripts/Status/History.js");
    assets.addJs("/public/javascripts/Status/StatusData.js");
    assets.addJs("/public/javascripts/Pieces/IPieceLocationValidator.js");
    assets.addJs("/public/javascripts/Pieces/RelatedLocationCalculator.js");
    assets.addJs("/public/javascripts/Pieces/PieceAttack.js");
    assets.addJs("/public/javascripts/Pieces/PieceAttackProfile.js");
    assets.addJs("/public/javascripts/Pieces/IPieceDropHandler.js");
    assets.addJs("/public/javascripts/Pieces/Piece.js");
    assets.addJs("/public/javascripts/Pieces/PieceDefinition.js");
    assets.addJs("/public/javascripts/Pieces/PieceFactory.js");
    assets.addJs("/public/javascripts/Teams/Team.js");
    assets.addJs("/public/javascripts/Teams/TeamFactory.js");
    assets.addJs("/public/javascripts/Boards/BoardDisplayDataService.js");
    assets.addJs("/public/javascripts/Boards/Board.js");
    assets.addJs("/public/javascripts/Game.js");
    assets.addJs("/public/javascripts/GameFactory.js");
    assets.addJs("/public/javascripts/GameController.js");
}