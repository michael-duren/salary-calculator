using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FallbackController : Controller
    {
        [AllowAnonymous]
        public IActionResult Index()
        {
            try
            {
                return PhysicalFile(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"),
                    "text/html"
                );
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
