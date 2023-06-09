import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { convertFromCurrency } from '../../utils/currency';
import { v4 as uuid } from 'uuid';
import agent from '../../api/agent';
import Spinner from '../spinner/Spinner';

export default function NewEmployeeForm(props) {
  const { employees, setEmployees } = props;
  const [loading, setLoading] = useState(false);
  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    title: '',
    salary: '',
  };
  const [employee, setEmployee] = useState(initialState);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addEmployee = (event, employee) => {
    event.preventDefault();
    setLoading(true);
    employee.id = uuid();
    employee.salary = convertFromCurrency(employee.salary);
    agent.Employees.create(employee).then(() => {
      setEmployees([...employees, employee]);
      setLoading(false);
    });
    setEmployee(initialState);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <div className="flex flex-col mx-4 pb-8 border-b-2">
      <h2
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="text-2xl flex text-gray-700 hover:text-gray-900 cursor-pointer items-center mx-4"
      >
        <AiOutlinePlusCircle className="mr-2 " />
        Add Employee
      </h2>
      {isFormOpen && (
        <>
          <form
            onSubmit={(event) => addEmployee(event, employee)} //
            className="flex items-start justify-between my-4  "
          >
            <input
              value={employee.firstName}
              onChange={handleInputChange}
              className="p-2 border-b-2"
              type="text"
              name="firstName"
              placeholder="First Name"
              required
            />
            <input
              value={employee.lastName}
              onChange={handleInputChange}
              className="p-2 border-b-2"
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              value={employee.employeeId}
              onChange={handleInputChange}
              className="p-2 border-b-2"
              name="employeeId"
              type="text"
              placeholder="ID"
              required
            />
            <input
              value={employee.title}
              onChange={handleInputChange}
              name="title"
              className="p-2 border-b-2"
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={employee.salary}
              onChange={handleInputChange}
              className="p-2 border-b-2"
              type="text"
              name="salary"
              placeholder="Anual Salary"
              required
            />
            <button
              className="bg-gray-800 flex items-center justify-center h-10 w-20 shadow-md rounded-md  hover:scale-105 focus:bg-slate-700 focus:scale-100  text-slate-100"
              type="submit"
            >
              {loading ? (
                <Spinner size={15} color="white" />
              ) : (
                <div>Submit</div>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
