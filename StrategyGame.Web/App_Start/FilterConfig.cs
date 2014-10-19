namespace AgileObjects.StrategyGame.Web
{
    using System.Web.Mvc;

    internal class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
