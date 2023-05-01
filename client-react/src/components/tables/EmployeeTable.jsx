import { IoRemoveCircleOutline } from 'react-icons/io5';
import { convertToCurrency } from '../../utils/currency';

export default function EmployeeTable(props) {
  const { employees, setEmployees } = props;

  const onRemoveEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
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
                  <div
                    onClick={() => onRemoveEmployee(id)}
                    className="cursor-pointer"
                  >
                    <IoRemoveCircleOutline size={20} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
