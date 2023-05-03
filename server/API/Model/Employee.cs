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
        public string Secret { get; set; }
    }

    // DDTO - Data Transfer Object, hide secret propeties if necessary
    // currently no use for this, but if need be it's here
    public class EmployeeDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmployeeId { get; set; }
        public string Title { get; set; }
        public ulong Salary { get; set; }
    }
}
