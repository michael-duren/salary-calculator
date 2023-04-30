using Microsoft.AspNetCore.Mvc;
using API.Model;
using API.Context;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class EmployeesController : BaseApiController
{
    private readonly DataContext _context;

    public EmployeesController(DataContext context)
    {
        _context = context;
    }

    [HttpGet] // api/activities
    public async Task<ActionResult<List<Employee>>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }
}
