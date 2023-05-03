import { useState } from 'react';
import {
  convertFromCurrency,
  convertToCurrency,
} from '../../../utils/currency';
import agent from '../../../api/agent';
import Spinner from '../../spinner/Spinner';

export default function EmployeeItem(props) {
  const { employee, loading, setLoading, setEmployees } = props;
  const [target, setTarget] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editEmployee, setEditEmployee] = useState(employee);
  const { id, employeeId, firstName, lastName, title, salary } = editEmployee;

  const onRemoveEmployee = (e, id) => {
    setTarget(e.currentTarget.name);
    setLoading(true);
    agent.Employees.delete(id).then(() => {
      setEmployees(employees.filter((employee) => employee.id !== id));
      setLoading(false);
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === salary) {
      convertFromCurrency(value);
    }
    setEditEmployee({ ...editEmployee, [name]: value });
  };
  return (
    <div key={employeeId} className="p-2 grid grid-cols-12">
      {isEdit ? (
        <>
          <input
            value={firstName}
            type="text"
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-20"
            onChange={handleInputChange}
            name="firstName"
          />
          <input
            type="text"
            value={lastName}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-20"
            onChange={handleInputChange}
            name="lastName"
          />
          <input
            type="number"
            value={employeeId}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-24"
            onChange={handleInputChange}
            name="employeeId"
          />
          <input
            type="text"
            value={title}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-20"
            onChange={handleInputChange}
            name="title"
          />
          <input
            type="number"
            value={salary}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-20"
            onChange={handleInputChange}
            name="salary"
          />
        </>
      ) : (
        <>
          <div className="col-span-2">{firstName}</div>
          <div className="col-span-2">{lastName}</div>
          <div className="col-span-2">{employeeId}</div>
          <div className="col-span-2">{title}</div>
          <div className="col-span-2">{convertToCurrency(salary)}</div>
        </>
      )}
      <div className="col-span-2 flex items-start justify-start">
        <button
          className="cursor-pointer"
          onClick={() => setIsEdit(!isEdit)}
          name={id}
        >
          {' '}
          {loading && target === id ? (
            <Spinner size={15} />
          ) : (
            <div className="text-base text-blue-500 hover:text-blue-700">
              Edit
            </div>
          )}
        </button>
        <button
          onClick={(e) => onRemoveEmployee(e, id)}
          className="cursor-pointer"
          name={id}
        >
          {' '}
          {loading && target === id ? (
            <Spinner size={15} />
          ) : (
            <div className="ml-6 text-base text-red-500 hover:text-red-700">
              Delete
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
