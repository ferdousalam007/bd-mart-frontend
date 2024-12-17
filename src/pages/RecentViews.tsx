import SectionTitle from "../components/SectionTitle";
import { Link } from "react-router-dom";
import { useLocalStorageState } from "../utils/useLocalStorageState";

const RecentViews = () => {
  const [recentViews] = useLocalStorageState([], "recentViews");
console.log(recentViews,"recentViews");
  return (
    <section className="container mx-auto  lg:py-14 py-10 px-5">
      <SectionTitle
        title="Recent Views"
        description={"Your recently viewed products are displayed here."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentViews.map((product: any) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="border rounded-lg shadow-sm p-4  hover:shadow-lg transition duration-300 bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-contain max-h-full max-w-full"
            />
            <h3 className="text-primary text-lg font-medium mt-3 mb-2 hover:text-slate-700 cursor-pointer">
              {product.name}
            </h3>
            <span className="text-red-500 text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentViews;
