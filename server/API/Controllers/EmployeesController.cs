using Microsoft.AspNetCore.Mvc;
using API.Model;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    [HttpGet] // api/employees
    public IActionResult Get()
    {
        return Ok();
    }
}
