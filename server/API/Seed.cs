using API.Context;
using API.Model;

namespace API.Seed;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (context.Employees.Any())
            return;

        var employees = new List<Employee>
        {
            new Employee
            {
                FirstName = "Daniel",
                LastName = "Duren",
                EmployeeId = "123899",
                Title = "Director",
                Salary = 95000,
            },
            new Employee
            {
                FirstName = "Michael",
                LastName = "Duren",
                EmployeeId = "460577",
                Title = "Software Engineer",
                Salary = 80000,
            }
        };

        await context.Employees.AddRangeAsync(employees);
        await context.SaveChangesAsync();
    }
}
