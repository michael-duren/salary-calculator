import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { BarChart } from './components/charts/BarChart';
import { CategoryScale } from 'chart.js';
import { options } from './components/charts/BarChart';
import NewEmployeeForm from './components/forms/NewEmployeeForm';
import EmployeeTable from './components/tables/employee-table/EmployeeTable';
import MonthlyBudget from './components/budget/MonthlyBudget';
import Header from './components/header/Header';
import { formatChartData } from './utils/formatChartData';
import agent from './api/agent';
import Spinner from './components/spinner/Spinner';

Chart.register(CategoryScale);

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    agent.Employees.list().then((response) => {
      setLoading(false);
      return setEmployees(response);
    });
  }, []);

  if (loading) {
    return <Spinner full={true} message="Loading Employees..." />;
  }

  return (
    <>
      <Header />
      <main className="mx-16 my-6 ">
        <NewEmployeeForm employees={employees} setEmployees={setEmployees} />
        <div className="flex border-b-2 pb-4 space-x-4 mt-8">
          <EmployeeTable setEmployees={setEmployees} employees={employees} />
          <div className="flex-1">
            <BarChart
              options={options}
              chartData={formatChartData(employees)}
            />
          </div>
        </div>
      </main>
      <footer>
        <MonthlyBudget employees={employees} />
      </footer>
    </>
  );
}

export default App;
