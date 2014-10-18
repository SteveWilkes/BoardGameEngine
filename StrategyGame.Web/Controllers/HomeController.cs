namespace AgileObjects.StrategyGame.Web.Controllers
{
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
    }
}