import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-800/60 p-4 flex justify-center items-center">
      <div className="bg-white max-w-md w-full p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Permanent Delete</h1>
          <button onClick={close} className="cursor-pointer">
            <IoClose size={25} />
          </button>
        </div>
        <p className="my-4">Are you sure to permanent delete?</p>
        <div className="w-fit ml-auto flex items-center gap-3">
          <button
            onClick={cancel}
            className="px-4 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-1 rounded border border-green-600 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
