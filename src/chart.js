const createNewChart = (employees, ctx) => {
  const names = employees.map((employee) => {
    return employee.firstName;
  });

  const salaries = employees.map((employee) => {
    return employee.annualSalary;
  });
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [...names],
      datasets: [
        {
          label: 'Employee Salary',
          data: [...salaries],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
