import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { BarChart } from './components/BarChart';
import { CategoryScale } from 'chart.js';
import { convertToCurrency } from './utils/currency';
import { options } from './components/BarChart';

Chart.register(CategoryScale);

function App() {
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState({});
  const firstName = useRef(null);
  const lastName = useRef(null);
  const employeeId = useRef(null);
  const title = useRef(null);
  const salary = useRef(null);
  console.log(employees);

  useEffect(() => {
    const fetchEmployees = async () => {
      axios.get('http://localhost:5145/api/employees').then((response) => {
        setEmployees(response.data);
        setChartData({
          labels: response.data.map((employee) => employee.firstName),
          datasets: [
            {
              label: 'Employee Salary',
              data: response.data.map((employee) => employee.salary),
              borderWidth: 1,
            },
          ],
        });
      });
    };
    fetchEmployees().catch((error) => console.log(error));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const updateMonthlyBudget = () => {
    console.log('updated');
  };

  const onRemove = () => {
    console.log('removed');
  };

  return (
    <>
      <header className="flex mx-20 mt-4 items-center justify-start  border-b-2 py-4">
        <h1 className="text-slate-900 text-4xl">Salary Calculator</h1>
      </header>
      <main className="mx-16 my-8 ">
        <div className="flex flex-col">
          <h2 className="text-2xl m-4">Add Employee</h2>
          <form
            onSubmit={onSubmit}
            className="flex items-start justify-between m-4 border-b-2 py-8"
          >
            <input
              ref={firstName}
              className="p-2 border-b-2"
              type="text"
              placeholder="First Name"
            />
            <input
              ref={lastName}
              className="p-2 border-b-2"
              type="text"
              placeholder="Last Name"
            />
            <input
              ref={employeeId}
              className="p-2 border-b-2"
              type="text"
              placeholder="ID"
            />
            <input
              ref={title}
              className="p-2 border-b-2"
              type="text"
              placeholder="Title"
            />
            <input
              ref={salary}
              className="p-2 border-b-2"
              type="text"
              placeholder="Anual Salary"
            />
            <button
              className="bg-gray-800 shadow-md rounded-md px-3 py-2 hover:scale-105 focus:bg-slate-700 focus:scale-100  text-slate-100"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex border-b-2 pb-4 space-x-4 mt-8">
          <div className="flex-1">
            <h2 className="text-2xl mb-8 m-4">Employees</h2>
            <div id="employee-table">
              <div className="border-b-2 pb-2 grid grid-cols-11">
                <div className="col-span-2">First Name</div>
                <div className="col-span-2">Last Name</div>
                <div className="col-span-2">ID</div>
                <div className="col-span-2">Title</div>
                <div className="col-span-2">Salary</div>
                <div className="col-span-1"></div>
              </div>
              {employees.length &&
                employees.map((employee) => {
                  const { employeeId, firstName, lastName, title, salary } =
                    employee;
                  return (
                    <div key={employeeId} className="p-2 grid grid-cols-11">
                      <div className="col-span-2">{firstName}</div>
                      <div className="col-span-2">{lastName}</div>
                      <div className="col-span-2">{employeeId}</div>
                      <div className="col-span-2">{title}</div>
                      <div className="col-span-2">
                        {convertToCurrency(salary)}
                      </div>
                      <div className="col-span-1 flex items-start justify-start">
                        <div onClick={onRemove} className="cursor-pointer">
                          <svg
                            className=" w-5 h-5 text-slate-600 hover:text-slate-900"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {chartData.datasets && (
            <div className="flex-1">
              <BarChart options={options} chartData={chartData} />
            </div>
          )}
        </div>
      </main>
      <footer>
        <div className="flex mx-16 mb-16 justify-start">
          <div>
            <h2
              id="total-monthly"
              className="text-slate-800  rounded-md p-2 text-4xl"
            >
              Total Monthly:{' '}
            </h2>
            <div className="mt-4">
              Monthly Budget:{' '}
              <input
                id="monthly-budget"
                className="p-2 ml-2 w-24 border-b-2"
                type="texthttp://127.0.0.1:5555/src/index.html"
                placeholder="$20,000"
              />
              <button
                onClick={updateMonthlyBudget}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
