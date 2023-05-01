export const formatChartData = (employees) => {
  return {
    labels: employees.map((employee) => employee.firstName),
    datasets: [
      {
        label: 'Employee Salary',
        data: employees.map((employee) => employee.salary),
        borderWidth: 1,
      },
    ],
  };
};
