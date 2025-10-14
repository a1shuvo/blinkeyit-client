import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import ConfirmBox from "../components/ConfirmBox";
import EditCategory from "../components/EditCategory";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import UploadCategoryModal from "../components/UploadCategoryModal";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  useEffect(()=>{
    setCategoryData(allCategory)
  },[allCategory])

  // const fetchCategory = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await Axios({
  //       ...SummaryApi.get_category,
  //     });
  //     const { data: responseData } = response;
  //     if (responseData?.success) {
  //       setCategoryData(responseData?.data);
  //     }
  //   } catch (error) {
  //     AxiosToastError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategory();
  // }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_category,
        data: deleteCategory,
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded cursor-pointer"
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categoryData.map((category) => {
          return (
            <div key={category._id} className="w-32 h-56 rounded shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down"
              />
              <div className="flex items-center h-9 gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModal
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          fetchData={fetchCategory}
          close={() => setOpenEdit(false)}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          confirm={handleDeleteCategory}
          cancel={() => setOpenConfirmBoxDelete(false)}
          close={() => setOpenConfirmBoxDelete(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;
