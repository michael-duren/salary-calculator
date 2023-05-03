import { FcCalculator } from 'react-icons/fc';

export default function Header() {
  return (
    <header className="flex mx-20  items-center justify-between  border-b-2 py-8">
      <h1 className="text-slate-900 text-4xl">Salary Calculator</h1>
      <FcCalculator size={40} />
    </header>
  );
}
