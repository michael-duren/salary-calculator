import { ImSpinner } from 'react-icons/im';

export default function Spinner(props) {
  const { message = 'loading...' } = props;
  return (
    <div className="flex space-y-4 animate-pulse flex-col items-center justify-center w-screen h-screen">
      <div>
        <ImSpinner className="animate-spin  text-gray-500" size={60} />
      </div>
      <div className=" text-gray-500">{message}</div>
    </div>
  );
}
