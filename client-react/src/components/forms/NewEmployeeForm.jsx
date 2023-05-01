import { useState } from 'react';
import { convertFromCurrency } from '../../utils/currency';
import { v4 as uuid } from 'uuid';

export default function NewEmployeeForm(props) {
  const { employees, setEmployees } = props;
  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    title: '',
    salary: '',
  };
  const [employee, setEmployee] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const addEmployee = (event, employee) => {
    event.preventDefault();
    setEmployees([
      ...employees,
      { ...employee, salary: convertFromCurrency(employee.salary), id: uuid() },
    ]);
    setEmployee(initialState);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl m-4">Add Employee</h2>
      <form
        onSubmit={(event) => addEmployee(event, employee)} //
        className="flex items-start justify-between m-4 border-b-2 py-8"
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
          className="bg-gray-800 shadow-md rounded-md px-3 py-2 hover:scale-105 focus:bg-slate-700 focus:scale-100  text-slate-100"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
