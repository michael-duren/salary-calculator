const ctx = document.querySelector('#employee-chart');

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Michael'],
    datasets: [
      {
        label: 'Employee Salary',
        data: ['80000'],
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
