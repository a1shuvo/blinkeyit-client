import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage";

const UploadSubCategoryModal = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    const { data: imageResponse } = response;
    setLoading(false);

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: imageResponse.data.url,
      };
    });
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Sub Category</h1>
          <button
            onClick={close}
            className="w-fit block ml-auto cursor-pointer"
          >
            <IoClose size={25} />
          </button>
        </div>
        <form className="py-3 grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter sub category name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex items-center gap-4 flex-col lg:flex-row">
              <div className="border border-blue-100 bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {subCategoryData?.image ? (
                  <img
                    alt="sub category"
                    src={subCategoryData.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className={`${
                    !subCategoryData.name
                      ? "bg-gray-300"
                      : "border border-primary-200 hover:bg-primary-100 cursor-pointer"
                  } px-4 py-2 rounded`}
                >
                  {loading ? "Loading..." : "Upload Image"}
                </div>
                <input
                  disabled={!subCategoryData.name || loading}
                  onChange={handleUploadSubCategoryImage}
                  type="file"
                  name="image"
                  id="uploadSubCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="bg-blue-50 border border-blue-100 focus-within:border-primary-200 rounded">
              {/* Display Value */}

              {/* Select Category */}
              <select
                name=""
                id=""
                className="w-full p-2 bg-transparent outline-none"
              >
                <option value="" disabled>
                  Select Category
                </option>
              </select>
            </div>
          </div>
          <button
            className={`${
              subCategoryData.name && subCategoryData.image
                ? "bg-primary-100 hover:bg-primary-200 cursor-pointer"
                : "bg-gray-300"
            } py-2 rounded font-medium`}
            disabled={loading}
          >
            Add Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModal;
