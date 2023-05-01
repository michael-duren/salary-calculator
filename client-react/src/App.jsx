import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { BarChart } from './components/charts/BarChart';
import { CategoryScale } from 'chart.js';
import { options } from './components/charts/BarChart';
import NewEmployeeForm from './components/forms/NewEmployeeForm';
import EmployeeTable from './components/tables/EmployeeTable';
import MonthlyBudget from './components/budget/MonthlyBudget';
import Header from './components/header/Header';

Chart.register(CategoryScale);

function App() {
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState({});

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

  return (
    <>
      <Header />
      <main className="mx-16 my-8 ">
        <NewEmployeeForm employees={employees} setEmployees={setEmployees} />

        <div className="flex border-b-2 pb-4 space-x-4 mt-8">
          <EmployeeTable setEmployees={setEmployees} employees={employees} />
          {chartData.datasets && (
            <div className="flex-1">
              <BarChart options={options} chartData={chartData} />
            </div>
          )}
        </div>
      </main>
      <footer>
        <MonthlyBudget employees={employees} />
      </footer>
    </>
  );
}

export default App;
