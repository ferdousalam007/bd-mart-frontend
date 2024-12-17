import { useNavigate } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { useAllProducts } from "../../hooks/products/useAllProducts";
import AddToCartButton from "../AddToCartButton";
import CompareButton from "../CompareButton";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const FlashSale = () => {
  const navigate = useNavigate();
  const { products, error, isLoading } = useAllProducts({
    limit: 4,
    "discount[gt]": 0,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error.message}
      </h2>
    );

  return (
    <section className="py-10 bg-primary-background container px-5 mx-auto">
      {/* Section Title */}
      <SectionTitle
        title="Flash Sale Deals"
        description="Limeted offer for the best products"
        className="text-center"
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
                  <span className="font-bold text-slate-800"> Category : </span>{" "}
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
                ${product.price.toFixed(2)}
              </span>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col gap-2">
              <AddToCartButton product={product} />
              <CompareButton product={product} />
            </div>
          </div>
          // <div
          //   key={product._id}
          //   className="relative bg-primary-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in duration-300"
          // >
          //   <img
          //     src={product.images[0]}
          //     alt={product.name}
          //     className="w-full h-52 object-contain rounded-lg mb-4 bg-[rgba(109,123,255,0.2)]"
          //   />
          //   {product.discount > 0 && (
          //     <div className="absolute top-4 right-4 bg-error-color   text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
          //       {product.discount}% OFF
          //     </div>
          //   )}
          //   <h3 className="text-lg font-bold text-primary-text mb-2">
          //     {product.name}
          //   </h3>
          //   <p className="text-success-color font-semibold mb-4  text-lg">
          //     ${product.price}
          //   </p>
          //   <div className="flex justify-between gap-3">
          //     <AddToCartButton product={product} />
          //     <CompareButton product={product} />
          //   </div>
          // </div>
        ))}
      </div>

      <div className="text-right mt-8">
        <button
          onClick={() => navigate("/products?discount[gt]=0")}
          className="flex items-end justify-center gap-2 px-6 py-3 bg-[#FFBD0C] text-gray-800 rounded-md hover:bg-yellow-500 transition-colors duration-300"
        >
          Flash Sale{" "}
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
            className="lucide lucide-square-arrow-out-up-right"
          >
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
