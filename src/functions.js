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

const addEmployee = (employee) => {
  const { firstName, lastName, employeeId, title, annualSalary } = employee;
  return `<div id="i${employeeId}" class="p-2 grid grid-cols-11">
            <div class="col-span-2">${firstName}</div>
            <div class="col-span-2">${lastName}</div>
            <div class="col-span-2">${employeeId}</div>
            <div class="col-span-2">${title}</div>
            <div class="col-span-2">${annualSalary}</div>
            <div class="col-span-1 flex items-start justify-start">
              <div onclick="onRemove(${employeeId})" class="cursor-pointer">
                <svg class="h-5 text-slate-600 hover:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
    `;
};

const onSubmit = (event) => {
  event.preventDefault();

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
  totalMonthly.innerHTML = `Total Monthly: ${getTotalMonthly()}`;

  // clear input fields
  firstName.value = '';
  lastName.value = '';
  employeeId.value = '';
  title.value = '';
  annualSalary.value = '';
};

const onRemove = (id) => {
  const itemToRemove = document.querySelector(`#i${id}`);
  itemToRemove.remove();
  const removeIndex = employees.indexOf(
    employees.find((employee) => employee.employeeId === id)
  );

  employees.splice(removeIndex, 1);

  if (chart !== null) {
    chart.destroy();
  }
  chart = createNewChart(employees, ctx);
  totalMonthly.innerHTML = `Total Monthly: $${getTotalMonthly()}`;
};

const getTotalMonthly = () => {
  const total = employees.reduce((acc, employee) => {
    return acc + +employee.annualSalary;
  }, 0);
  const totalMonthlyValue = (total / 12).toFixed(2);
  if (totalMonthlyValue > 20000) {
    totalMonthly.classList.remove('text-slate-800');
    totalMonthly.classList.add('bg-red-500', 'text-white');
    return totalMonthlyValue;
  }
  totalMonthly.classList.remove('bg-red-500');
  return totalMonthlyValue;
};
