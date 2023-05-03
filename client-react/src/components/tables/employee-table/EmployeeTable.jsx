import { BsPersonCircle } from 'react-icons/bs';
import { useState } from 'react';
import EmployeeItem from '../employee-item/EmployeeItem';
import agent from '../../../api/agent';

export default function EmployeeTable(props) {
  const { employees, setEmployees } = props;
  const [loading, setLoading] = useState(false);

  const onUpdateEmployee = (
    editedEmployee,
    isEditMenuOpen,
    setIsEditMenuOpen
  ) => {
    setLoading(true);
    agent.Employees.update(editedEmployee)
      .then(() => {
        setEmployees([
          ...employees.filter((employee) => employee.id !== editedEmployee.id),
          { ...editedEmployee, salary: Number(editedEmployee.salary) },
        ]);
        setLoading(false);
        setIsEditMenuOpen(!isEditMenuOpen);
      })
      .catch((e) => console.log(e));
  };

  const onRemoveEmployee = (e, id, setTarget) => {
    setTarget(e.currentTarget.name);
    setLoading(true);
    agent.Employees.delete(id).then(() => {
      setEmployees(employees.filter((employee) => employee.id !== id));
      setLoading(false);
    });
  };

  return (
    <div className="flex-1">
      <h2 className="text-2xl  flex items-center justify-start mb-8 m-4">
        <BsPersonCircle className="text-gray-600" />
        <div className="ml-2">Employees</div>
      </h2>
      <div id="employee-table">
        <div className="border-b-2 pb-2 grid grid-cols-12">
          <div className="col-span-2">First Name</div>
          <div className="col-span-2">Last Name</div>
          <div className="col-span-2">ID</div>
          <div className="col-span-2">Title</div>
          <div className="col-span-2">Salary</div>
          <div className="col-span-2"></div>
        </div>
        {employees.length &&
          employees.map((employee) => {
            return (
              <EmployeeItem
                key={employee.id}
                employee={employee}
                loading={loading}
                setLoading={setLoading}
                setEmployees={setEmployees}
                onUpdateEmployee={onUpdateEmployee}
                onRemoveEmployee={onRemoveEmployee}
              />
            );
          })}
      </div>
    </div>
  );
}
