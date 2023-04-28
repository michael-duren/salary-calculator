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

let chart = createNewChart(employees, ctx);

// functions
const onSubmit = (event) => {
  event.preventDefault();
  console.log('CLICKED');
  const newEmployee = {
    firstName: firstName.value,
    lastName: lastName.value,
    employeeId: employeeId.value,
    title: title.value,
    annualSalary: annualSalary.value,
  };
  table.innerHTML += addEmployee(newEmployee);
  employees.push(newEmployee);
  if (chart !== null) {
    chart.destroy();
  }
  chart = createNewChart(employees, ctx);
};

const onRemove = (event) => {
  console.log('REMOVED');
  event.target.parentElement.parentElement.parentElement.remove();
};

const addEmployee = (employee) => {
  const { firstName, lastName, employeeId, title, annualSalary } = employee;
  return `<div class="p-2 grid grid-cols-11">
            <div class="col-span-2">${firstName}</div>
            <div class="col-span-2">${lastName}</div>
            <div class="col-span-2">${employeeId}</div>
            <div class="col-span-2">${title}</div>
            <div class="col-span-2">${annualSalary}</div>
            <div class="col-span-1 flex items-start justify-start">
              <div onclick="onRemove(event)" class="cursor-pointer">
                <svg class="h-5 text-slate-600 hover:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
    `;
};
