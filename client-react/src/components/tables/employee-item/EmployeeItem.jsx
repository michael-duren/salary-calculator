import { useState } from 'react';
import { convertToCurrency } from '../../../utils/currency';
import agent from '../../../api/agent';
import Spinner from '../../spinner/Spinner';

export default function EmployeeItem(props) {
  const { employee, loading, setLoading, setEmployees } = props;
  const { id, employeeId, firstName, lastName, title, salary } = employee;
  const [target, setTarget] = useState('');

  const onRemoveEmployee = (e, id) => {
    setTarget(e.currentTarget.name);
    setLoading(true);
    agent.Employees.delete(id).then(() => {
      setEmployees(employees.filter((employee) => employee.id !== id));
      setLoading(false);
    });
  };
  return (
    <div key={employeeId} className="p-2 grid grid-cols-12">
      <div className="col-span-2">{firstName}</div>
      <div className="col-span-2">{lastName}</div>
      <div className="col-span-2">{employeeId}</div>
      <div className="col-span-2">{title}</div>
      <div className="col-span-2">{convertToCurrency(salary)}</div>
      <div className="col-span-2 flex items-start justify-start">
        <button className="cursor-pointer" name={id}>
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
