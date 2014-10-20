namespace AgileObjects.StrategyGame.Web
{
    using System.Web.Optimization;

    internal class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/site").Include(
                "~/Scripts/Game.App.js",
                "~/Scripts/Directives/Game.RemoveClass.js",
                "~/Scripts/Directives/Game.SizeToContainer.js",
                "~/Scripts/Game.BoardSettings.js",
                "~/Scripts/Game.BoardState.js",
                "~/Scripts/Game.BoardConfig.js",
                "~/Scripts/Game.BoardContainer.js",
                "~/Scripts/Game.BoardTile.js",
                "~/Scripts/Game.Board.js",
                "~/Scripts/Game.BoardController.js"));

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
