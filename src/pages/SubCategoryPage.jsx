import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import DisplayTable from "../components/DisplayTable";
import UploadSubCategoryModal from "../components/UploadSubCategoryModal";
import ViewImage from "../components/ViewImage";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const columnHelper = createColumnHelper();

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 cursor-pointer"
              onClick={() => setImageURL(row.original.image)}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
    }),
  ];

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded cursor-pointer"
        >
          Add Sub Category
        </button>
      </div>

      <div>
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModal close={() => setOpenAddSubCategory(false)} />
      )}

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />}
    </section>
  );
};

export default SubCategoryPage;
