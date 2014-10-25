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
                "~/Scripts/Game.BoardSizeDefaults.js",
                "~/Scripts/Game.BoardSizeSet.js",
                "~/Scripts/Game.Coordinates.js",
                "~/Scripts/Game.BoardTile.js",
                "~/Scripts/Game.PieceMovement.js",
                "~/Scripts/Game.PieceMover.js",
                "~/Scripts/Game.BoardContainer.js",
                "~/Scripts/Game.Piece.js",
                "~/Scripts/Game.AnyDirectionMovementProfile.js",
                "~/Scripts/Game.Game.js",
                "~/Scripts/Game.Board.js",
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
