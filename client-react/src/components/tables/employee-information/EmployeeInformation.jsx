import { convertToCurrency } from '../../../utils/currency';

export default function EmployeeInformation(props) {
  const { employee, editEmployee, isEditMenuOpen, handleInputChange } = props;
  const { employeeId, firstName, lastName, title, salary } = editEmployee;

  return (
    <>
      {isEditMenuOpen ? (
        <>
          <input
            value={firstName}
            type="text"
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-28"
            onChange={handleInputChange}
            name="firstName"
          />
          <input
            type="text"
            value={lastName}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-28"
            onChange={handleInputChange}
            name="lastName"
          />
          <input
            type="number"
            value={employeeId}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-28"
            onChange={handleInputChange}
            name="employeeId"
          />
          <input
            type="text"
            value={title}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-28"
            onChange={handleInputChange}
            name="title"
          />
          <input
            type="number"
            value={salary}
            className="p-1 border-2 rounded-md border-gray-300 col-span-2 w-28"
            onChange={handleInputChange}
            name="salary"
          />
        </>
      ) : (
        <>
          <div className="col-span-2 p-1">{employee.firstName}</div>
          <div className="col-span-2 p-1">{employee.lastName}</div>
          <div className="col-span-2 p-1">{employee.employeeId}</div>
          <div className="col-span-2 p-1">{employee.title}</div>
          <div className="col-span-2 p-1">
            {convertToCurrency(employee.salary)}
          </div>
        </>
      )}
    </>
  );
}
