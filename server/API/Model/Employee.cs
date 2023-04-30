namespace API.Model
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmployeeId { get; set; }
        public string Title { get; set; }
        public ulong Salary { get; set; }
    }
}
