﻿import bundleUp = require("bundle-up");

module.exports = (assets: bundleUp.IBundleUpAssets) => {
    assets.root = __dirname;

    assets.addCss("/public/stylesheets/site.styl");
    assets.addCss("/public/stylesheets/board-tile-attack-animation.styl");

    // https://github.com/btford/angular-socket-io
    assets.addJs("/public/javascripts/Generic/BtFord.Angular.Socket.io.js");

    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.RandomStringGenerator.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.Extensions.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.TryGetResult.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.Dictionary.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.EventCallbackSet.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.EventHub.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.Coordinates.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.CoordinatesRegistry.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.CoordinateTranslator.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.TypeScript.CoordinateTranslatorRegistry.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.JQuery.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.Services.IdGeneration.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.Services.EventPropogation.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.Services.Sockets.js");
    assets.addJs("/public/javascripts/Generic/AgileObjects.Angular.ScopeEvaluator.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.AddClassOnEvent.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.DragAndDrop.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.ScrollToBottom.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.SizeToContainer.js");
    assets.addJs("/public/javascripts/Directives/AgileObjects.Angular.Directives.Tabs.js");
    assets.addJs("/public/javascripts/App.js");
    assets.addJs("/public/javascripts/Boards/BoardSizeDefaults.js");
    assets.addJs("/public/javascripts/Boards/BoardDisplayManager.js");
    assets.addJs("/public/javascripts/Boards/BoardDisplayManager.Angular.js");
    assets.addJs("/public/javascripts/Pieces/PieceLocationConfigData.js");
    assets.addJs("/public/javascripts/Pieces/NullPieceLocation.js");
    assets.addJs("/public/javascripts/Pieces/PieceLocationBase.js");
    assets.addJs("/public/javascripts/Players/Player.js");
    assets.addJs("/public/javascripts/Players/RemotePlayerProxy.js");
    assets.addJs("/public/javascripts/Players/LocalHumanPlayer.js");
    assets.addJs("/public/javascripts/Boards/BoardTile.js");
    assets.addJs("/public/javascripts/Boards/BoardPosition.js");
    assets.addJs("/public/javascripts/Boards/BoardRowConfig.js");
    assets.addJs("/public/javascripts/Boards/BoardOrientationTranslator.js");
    assets.addJs("/public/javascripts/Boards/BoardType.js");
    assets.addJs("/public/javascripts/Boards/GetBoardTypeQuery.js");
    assets.addJs("/public/javascripts/Boards/GetBoardTypeQuery.Angular.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceMovement.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceAttack.js");
    assets.addJs("/public/javascripts/GlobalEventSet.js");
    assets.addJs("/public/javascripts/Games/GameEventSet.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/NullPotentialInteraction.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceInteractionBase.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceMovementInteractionBase.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/AddDestinationPieceToPieceInteraction.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/MovePieceToDestinationInteraction.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/MovePieceToDestinationPieceInteraction.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/AttackDestinationPieceInteraction.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceInteractionConstructorRegistry.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceInteractionCalculator.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceInteractionProfile.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/PieceInteractionMonitor.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/TakenPieceLocation.js");
    assets.addJs("/public/javascripts/Status/InteractionData.js");
    assets.addJs("/public/javascripts/Status/TurnData.js");
    assets.addJs("/public/javascripts/Status/PlayerData.js");
    assets.addJs("/public/javascripts/Status/GameData.js");
    assets.addJs("/public/javascripts/Status/ClientGameCoordinator.js");
    assets.addJs("/public/javascripts/Status/TurnDefinition.js");
    assets.addJs("/public/javascripts/Status/TurnManager.js");
    assets.addJs("/public/javascripts/Status/PieceMoveAction.js");
    assets.addJs("/public/javascripts/Status/PieceAttackAction.js");
    assets.addJs("/public/javascripts/Status/History.js");
    assets.addJs("/public/javascripts/Status/StatusData.js");
    assets.addJs("/public/javascripts/Ui/GameEventPropogator.js");
    assets.addJs("/public/javascripts/Ui/CompositeGameUiComponent.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/Validation/IsOccupiedLocationValidator.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/Validation/IsUnoccupiedLocationValidator.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/Validation/OccupiedLocationEvaluator.js");
    assets.addJs("/public/javascripts/Pieces/Interactions/RelatedLocationCalculator.js");
    assets.addJs("/public/javascripts/Pieces/Piece.js");
    assets.addJs("/public/javascripts/Pieces/PieceDefinition.js");
    assets.addJs("/public/javascripts/Pieces/PieceFactory.js");
    assets.addJs("/public/javascripts/Pieces/PieceFactory.Angular.js");
    assets.addJs("/public/javascripts/Teams/Team.js");
    assets.addJs("/public/javascripts/Teams/TeamFactory.js");
    assets.addJs("/public/javascripts/Teams/TeamFactory.Angular.js");
    assets.addJs("/public/javascripts/Boards/BoardDisplayData.js");
    assets.addJs("/public/javascripts/Boards/BoardDisplayDataService.js");
    assets.addJs("/public/javascripts/Boards/Board.js");
    assets.addJs("/public/javascripts/Games/GameType.js");
    assets.addJs("/public/javascripts/Games/GetGameTypeQuery.js");
    assets.addJs("/public/javascripts/Games/GetGameTypeQuery.Angular.js");
    assets.addJs("/public/javascripts/Games/Game.js");
    assets.addJs("/public/javascripts/Games/GameFactory.js");
    assets.addJs("/public/javascripts/Games/GameFactory.Angular.js");
    assets.addJs("/public/javascripts/Games/GameService.js");
    assets.addJs("/public/javascripts/Games/GameService.Angular.js");
    assets.addJs("/public/javascripts/Games/GameController.js");
}