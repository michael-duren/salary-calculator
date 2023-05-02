import { ImSpinner } from 'react-icons/im';

export default function Spinner(props) {
  const {
    message = 'loading...',
    full,
    size = 20,
    color = ' text-gray-500 ',
  } = props;
  if (full) {
    return (
      <div className="flex space-y-4 animate-pulse flex-col items-center justify-center w-screen h-screen">
        <div>
          <ImSpinner className={`animate-spin ${color}  `} size={size} />
        </div>
        <div className=" text-gray-500">{message}</div>
      </div>
    );
  }
  return (
    <div>
      <ImSpinner className={`animate-spin  ${color}`} size={size} />
    </div>
  );
}
