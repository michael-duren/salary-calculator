import { IoRemoveCircleOutline } from 'react-icons/io5';
import { convertToCurrency } from '../../utils/currency';
import agent from '../../api/agent';
import Spinner from '../spinner/Spinner';
import { useState } from 'react';

export default function EmployeeTable(props) {
  const { employees, setEmployees } = props;
  const [loading, setLoading] = useState(false);
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
            const { id, employeeId, firstName, lastName, title, salary } =
              employee;
            return (
              <div key={employeeId} className="p-2 grid grid-cols-11">
                <div className="col-span-2">{firstName}</div>
                <div className="col-span-2">{lastName}</div>
                <div className="col-span-2">{employeeId}</div>
                <div className="col-span-2">{title}</div>
                <div className="col-span-2">{convertToCurrency(salary)}</div>
                <div className="col-span-1 flex items-start justify-start">
                  <button
                    onClick={(e) => onRemoveEmployee(e, id)}
                    className="cursor-pointer"
                    name={id}
                  >
                    {' '}
                    {loading && target === id ? (
                      <Spinner size={15} />
                    ) : (
                      <IoRemoveCircleOutline size={20} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
