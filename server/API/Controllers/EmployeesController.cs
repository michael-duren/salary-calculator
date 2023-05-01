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

    [HttpGet] // api/employees
    public async Task<ActionResult<List<Employee>>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    [HttpGet("{id}")] // api/employees/{id}
    public async Task<ActionResult<Employee>> GetEmployee(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return employee;
    }

    [HttpPost] // api/employees
    public async Task<ActionResult<Employee>> AddEmployee(Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }

        _context.Remove(employee);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
