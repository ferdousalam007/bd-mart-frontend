import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCompare,
  removeProductFromCompare,
} from "../redux/comparisonSlice";
import { RootState } from "../redux/store";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai";

const CompareButton: React.FC<any> = ({ product }) => {
  const dispatch = useDispatch();
  const comparisonProducts = useSelector(
    (state: RootState) => state.comparison.products
  );
  const isAdded = comparisonProducts.some((p: any) => p._id === product._id);

  const handleClick = () => {
    if (comparisonProducts.length === 3) {
      return toast.error("You can only compare up to 3 products. same category");
    }

    if (
      comparisonProducts.length > 0 &&
      comparisonProducts[0].category._id !== product.category._id
    ) {
      return toast.error(
        "You can only compare products of the same category."
      );
    }
    if (isAdded) {
      dispatch(removeProductFromCompare(product._id));
    } else {
      dispatch(addProductToCompare(product));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center w-full h-12 text-sm font-medium text-center gap-2 px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300 ${
        isAdded
          ? "bg-error-color text-primary-white"
          : "bg-red-600 text-primary-white"
      }`}
      title={isAdded ? "Remove from comparison" : "Add to comparison"}
    >
      {isAdded ? (
        <>
          <AiOutlineCheckCircle size={20} />
          Added toField to comparison
        </>
      ) : (
        <>
          <span className=" flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-git-compare-arrows"
            >
              <circle cx="5" cy="6" r="3" />
              <path d="M12 6h5a2 2 0 0 1 2 2v7" />
              <path d="m15 9-3-3 3-3" />
              <circle cx="19" cy="18" r="3" />
              <path d="M12 18H7a2 2 0 0 1-2-2V9" />
              <path d="m9 15 3 3-3 3" />
            </svg>{" "}
            AddField to comparison
          </span>
        </>
      )}
    </button>
  );
};

export default CompareButton;
