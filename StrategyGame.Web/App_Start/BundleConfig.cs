namespace AgileObjects.StrategyGame.Web
{
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/site").Include(
                "~/Scripts/Game.App.js",
                "~/Scripts/Game.BoardConfig.js",
                "~/Scripts/Game.BoardTile.js",
                "~/Scripts/Game.Board.js",
                "~/Scripts/Game.BoardManager.js",
                "~/Scripts/Game.BoardLayoutManager.js",
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
