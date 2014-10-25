namespace AgileObjects.StrategyGame.Web
{
    using System.Web.Optimization;

    internal class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/site").Include(
                "~/Scripts/Generic/AgileObjects.Angular.ScopeEvaluator.js",
                "~/Scripts/Directives/AgileObjects.Angular.Directives.RemoveClass.js",
                "~/Scripts/Directives/AgileObjects.Angular.Directives.SizeToContainer.js",
                "~/Scripts/Directives/AgileObjects.Angular.Directives.DragAndDrop.js",
                "~/Scripts/Game.App.js",
                "~/Scripts/Boards/Game.BoardSizeDefaults.js",
                "~/Scripts/Boards/Game.BoardSizeSet.js",
                "~/Scripts/Pieces/Game.Coordinates.js",
                "~/Scripts/Teams/Game.BoardTileConfig.js",
                "~/Scripts/Teams/Game.TeamStartingFormation.js",
                "~/Scripts/Teams/Game.Team.js",
                "~/Scripts/Boards/Game.BoardTile.js",
                "~/Scripts/Boards/Game.PieceMovement.js",
                "~/Scripts/Boards/Game.PieceMover.js",
                "~/Scripts/Boards/Game.BoardContainer.js",
                "~/Scripts/Pieces/Game.PieceDefinition.js",
                "~/Scripts/Pieces/Game.PieceFactory.js",
                "~/Scripts/Pieces/Game.Piece.js",
                "~/Scripts/Pieces/Game.AnyDirectionMovementProfile.js",
                "~/Scripts/Game.Game.js",
                "~/Scripts/Boards/Game.BoardPosition.js",
                "~/Scripts/Boards/Game.BoardPositionRegistry.js",
                "~/Scripts/Boards/Game.Board.js",
                "~/Scripts/Game.GameController.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css"));

#if !DEBUG
            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
