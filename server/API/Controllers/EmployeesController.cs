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
    public async Task<ActionResult<List<EmployeeDTO>>> GetEmployees()
    {
        return await _context.Employees.Select(e => EmployeeToDTO(e)).ToListAsync();
    }

    [HttpGet("{id}")] // api/employees/{id}
    public async Task<ActionResult<EmployeeDTO>> GetEmployee(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return EmployeeToDTO(employee);
    }

    [HttpPost] // api/employees
    public async Task<ActionResult<Employee>> AddEmployee(Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
    }

    [HttpPut("{id}")] // api/employees
    public async Task<ActionResult<Employee>> UpdateEmployee(Guid id, EmployeeDTO employeeDTO)
    {
        if (id != employeeDTO.Id)
        {
            return BadRequest();
        }

        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        employee.FirstName = employeeDTO.FirstName;
        employee.LastName = employeeDTO.LastName;
        employee.EmployeeId = employeeDTO.EmployeeId;
        employee.Title = employeeDTO.Title;
        employee.Salary = employeeDTO.Salary;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EmployeeExists(id))
            {
                return NotFound();
            }
        }

        return NoContent();
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

    private bool EmployeeExists(Guid id)
    {
        return _context.Employees.Any(e => e.Id == id);
    }

    private static EmployeeDTO EmployeeToDTO(Employee employee) =>
        new EmployeeDTO
        {
            Id = employee.Id,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            EmployeeId = employee.EmployeeId,
            Title = employee.Title,
            Salary = employee.Salary
        };
}
