import { IoClose } from "react-icons/io5";
function ViewImage({ url, close }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md max-h-[90vh] p-4 bg-white rounded">
        <button className="w-fit block ml-auto cursor-pointer" onClick={close}>
          <IoClose size={25} />
        </button>
        <img
          src={url}
          alt="full screen"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>
  );
}

export default ViewImage;
