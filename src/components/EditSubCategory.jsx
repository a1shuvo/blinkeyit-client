import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import uploadImage from "../utils/uploadImage";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });
  const [loading, setLoading] = useState(false);

  const allCategory = useSelector((state) => state.product.allCategory);

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

  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData((prev) => ({
      ...prev,
      category: prev.category.filter((el) => el._id !== categoryId),
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button
            onClick={close}
            className="w-fit block ml-auto cursor-pointer"
          >
            <IoClose size={25} />
          </button>
        </div>
        <form className="py-3 grid gap-2" onSubmit={handleSubmitSubCategory}>
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
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat) => (
                  <div
                    className="bg-white shadow-md px-1 m-1 flex items-center gap-2 rounded"
                    key={cat?._id}
                  >
                    <span>{cat?.name}</span>

                    <button
                      type="button"
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveCategorySelected(cat?._id)}
                      aria-label={`Remove ${cat?.name}`}
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Select Category */}
              <select
                name=""
                id=""
                className="w-full p-2 bg-transparent outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );
                  setSubCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category) => {
                  return (
                    <option
                      value={category?._id}
                      key={category?._id + "subcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className={`${
              subCategoryData?.name &&
              subCategoryData?.image &&
              subCategoryData?.category[0]
                ? "bg-primary-100 hover:bg-primary-200 cursor-pointer"
                : "bg-gray-300"
            } py-2 rounded font-medium`}
            disabled={loading}
          >
            Update Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
