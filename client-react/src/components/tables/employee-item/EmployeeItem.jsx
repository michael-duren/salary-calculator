import { useState } from 'react';
import { convertFromCurrency } from '../../../utils/currency';
import Spinner from '../../spinner/Spinner';
import { HiPencilAlt } from 'react-icons/hi';
import { RxExit } from 'react-icons/rx';
import EmployeeInformation from '../employee-information/EmployeeInformation';

export default function EmployeeItem(props) {
  const { employee, loading, onRemoveEmployee, onUpdateEmployee } = props;
  const [target, setTarget] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(employee);
  const { id, salary } = editEmployee;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === salary) {
      convertFromCurrency(value);
    }
    setEditEmployee({ ...editEmployee, [name]: value });
  };
  return (
    <div className="p-2 grid grid-cols-12">
      <EmployeeInformation
        employee={employee}
        editEmployee={editEmployee}
        handleInputChange={handleInputChange}
        isEditMenuOpen={isEditMenuOpen}
      />
      {/* Buttons */}
      {!isMenuOpen ? (
        <button
          onClick={() => setIsMenuOpen(!isEditMenuOpen)}
          className="flex mb-8 items-center justify-center"
        >
          <HiPencilAlt
            className="text-gray-500 hover:text-gray-700"
            size={24}
          />
        </button>
      ) : (
        <>
          {!isEditMenuOpen ? (
            <div className="col-span-2 flex items-start justify-start">
              <button
                className="cursor-pointer"
                onClick={() => setIsEditMenuOpen(!isEditMenuOpen)}
                name={id}
              >
                {' '}
                <div className="text-base text-blue-500 hover:text-blue-700">
                  Edit
                </div>
              </button>
              <button
                onClick={(e) => onRemoveEmployee(e, id, setTarget)}
                className="cursor-pointer"
                name={id}
              >
                {loading && target === id ? (
                  <div className="mx-2">
                    <Spinner size={15} />
                  </div>
                ) : (
                  <div className="ml-4 text-base text-red-500 hover:text-red-700">
                    Delete
                  </div>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="cursor-pointer"
                name={id}
              >
                <div className="ml-4 flex items-center justify-center text-base text-gray-500 hover:text-gray-700">
                  <RxExit size={16} />
                </div>
              </button>
            </div>
          ) : (
            <div className="col-span-2 flex items-start justify-start">
              <button
                className="cursor-pointer"
                onClick={(e) =>
                  onUpdateEmployee(
                    e,
                    editEmployee,
                    isEditMenuOpen,
                    setIsEditMenuOpen,
                    setTarget
                  )
                }
                name={id}
              >
                {' '}
                {loading && target === id ? (
                  <Spinner size={15} />
                ) : (
                  <div className="text-base text-teal-500 hover:text-teal-700">
                    Update
                  </div>
                )}
              </button>
              <button
                onClick={() => setIsEditMenuOpen(!isEditMenuOpen)}
                className="cursor-pointer"
                name={id}
              >
                <div className="ml-6 text-base text-blue-500 hover:text-blue-700">
                  Back
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
