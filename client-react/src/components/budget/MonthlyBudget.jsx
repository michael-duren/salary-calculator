import { useState } from 'react';
import { convertToCurrency, convertFromCurrency } from '../../utils/currency';
import { HiPencilAlt } from 'react-icons/hi';

export default function MonthlyBudget(props) {
  const { employees } = props;
  const [budgetInput, setBudgetInput] = useState();
  const [budget, setBudget] = useState('$20,000');
  const [editOpen, setEditOpen] = useState(false);

  const total =
    employees.length &&
    employees.reduce((acc, employee) => (acc += employee.salary), 0) / 12;

  const updateMonthlyBudget = () => {
    setBudget(budgetInput);
    setEditOpen(false);
  };

  return (
    <div className="flex mx-16 mb-16 justify-start">
      <div>
        {total > convertFromCurrency(budget) ? (
          <>
            <h2
              id="total-monthly"
              className="text-white bg-red-500 rounded-md p-2 text-4xl"
            >
              Total Monthly: {convertToCurrency(total)}
            </h2>
            <p className="text-red-500">
              Warning! You are over your monthly budget
            </p>
          </>
        ) : (
          <h2
            id="total-monthly"
            className="text-slate-800  rounded-md p-2 text-4xl"
          >
            Total Monthly: {convertToCurrency(total)}
          </h2>
        )}
        <div className="mt-4 text-xl mx-4 space-x-2 flex items-center">
          <div>Monthly Budget:</div>
          {!editOpen ? (
            <>
              <div>{budget}</div>
              <button
                onClick={() => setEditOpen(true)}
                className="flex text-gray-500 hover:text-gray-700 items-center justify-center"
              >
                <HiPencilAlt size={20} />
              </button>
            </>
          ) : (
            <>
              <input
                id="monthly-budget"
                className="p-2 ml-2 w-24 border-b-2"
                type="text"
                placeholder="$20,000"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
              />
              <button
                onClick={updateMonthlyBudget}
                className="ml-2 text-base text-blue-500 hover:text-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => setEditOpen(false)}
                className="ml-2 text-red-500 text-base hover:text-red-700"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
