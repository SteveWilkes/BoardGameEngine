using AgileObjects.StrategyGame.Web;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace AgileObjects.StrategyGame.Web
{
    using Owin;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
