import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/products/useAllProducts";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import AddToCartButton from "../components/AddToCartButton";
import CompareButton from "../components/CompareButton";
import { Link } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
  const productsPerPage = 9;
  const category = searchParams.get("category") as string;
  const discountGte = searchParams.get("discount[gt]") as string;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const { isLoading, error, products, totalProducts } = useAllProducts({
    category,
    "discount[gt]": discountGte ? parseFloat(discountGte) : undefined,
    page: currentPage + 1,
    limit: productsPerPage,
    sort: "-_id",
  });

  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error?.message}
      </h2>
    );

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5">
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="container mx-auto">
          <SectionTitle
            title="All Products"
            description={`Browse all products in this shop`}
          />
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-sm p-4  hover:shadow-lg transition duration-300 bg-white"
              >
                {/* Discount Badge */}
                {product.discount && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded absolute">
                    {product.discount}% OFF
                  </span>
                )}
                {/* Product Image */}
                <Link to={`/products/${product._id}`} className="block mb-4">
                  <div className="w-full h-36 flex items-center justify-center mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>

                  <h3 className="text-primary text-lg font-semibold mb-2 hover:text-slate-700 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex  flex-col mb-2">
                  <span className="text-red-800 text-sm mr-1 uppercase underline mb-2">
                    <Link to={`/products?category=${product.category._id}`}>
                      <span className="font-bold text-slate-800">
                        {" "}
                        Category :{" "}
                      </span>{" "}
                      {product.category.name}
                    </Link>
                  </span>
                  <Link to={`/shops/${product.shop._id}`}>
                    <span className="text-red-800 text-sm mr-1 uppercase pt-2 underline">
                      <span className="font-bold text-slate-800"> shop : </span>
                      {product.shop.name}
                    </span>
                  </Link>
                </div>
                {/* Prices */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-500 text-lg font-bold">
                    $
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through">
                    {product.discount && `$${product.price.toFixed(2)}`}
                  </span>
                </div>
                {/* CTA Buttons */}
                <div className="flex flex-col gap-2">
                  <AddToCartButton product={product} />
                  <CompareButton product={product} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(totalProducts / productsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center items-center space-x-2 mt-5"
        activeClassName="bg-primary-brand text-slate-800"
        pageClassName="px-3 py-1 rounded-md border border-primary-grey"
        previousLabel="<"
        nextLabel=">"
        previousClassName="px-3 py-1 rounded-md border border-primary-grey"
        nextClassName="px-3 py-1 rounded-md border border-primary-grey"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Products;
