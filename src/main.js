// global variables

// inputs
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const employeeId = document.querySelector('#employee-id');
const title = document.querySelector('#title');
const annualSalary = document.querySelector('#annual-salary');

// table
const table = document.querySelector('#employee-table');

// chart
const ctx = document.querySelector('#employee-chart');

// starting employees
const employees = [
  {
    firstName: 'Daniel',
    lastName: 'Duren',
    employeeId: '123899',
    title: 'Director',
    annualSalary: '95000',
  },
  {
    firstName: 'Michael',
    lastName: 'Duren',
    employeeId: '460577',
    title: 'Software Engineer',
    annualSalary: '80000',
  },
];

// render chart
let chart = createNewChart(employees, ctx);
