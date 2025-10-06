import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import UploadCategoryModal from "../components/UploadCategoryModal";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_category,
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        setCategoryData(responseData?.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
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
        {categoryData.map((category, index) => {
          return (
            <div
              key={index}
              className="w-32 h-48 rounded shadow-md cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down"
              />
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
    </section>
  );
};

export default CategoryPage;
