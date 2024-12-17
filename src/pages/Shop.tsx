import { useParams } from "react-router-dom";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useShopDetails } from "../hooks/shops/useShopDetails";
import { useAllProducts } from "../hooks/products/useAllProducts";
import { useUserProfile } from "../hooks/users/useUserProfile";
import { useFollowShop } from "../hooks/users/useFollowShop";
import { useUnfollowShop } from "../hooks/users/useUnfollowShop";
import { Link } from "react-router-dom";
import CompareButton from "../components/CompareButton";
import AddToCartButton from "../components/AddToCartButton";

const Shop = () => {
  const { id } = useParams();
  const { userProfile } = useUserProfile();
  const { follow } = useFollowShop();
  const { unfollow } = useUnfollowShop();

  const {
    isLoading: shopLoading,
    error: shopError,
    shop,
  } = useShopDetails(id as string);
  const {
    isLoading: productsLoading,
    error: productsError,
    products,
  } = useAllProducts({
    shop: id as string,
  });

  if (shopLoading || productsLoading) return <Spinner />;
  if (shopError || productsError)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {shopError?.message || productsError?.message}
      </h2>
    );

  const toggleFollow = () => {
    if (shop.followers.includes(userProfile?._id)) {
      unfollow(shop._id);
    } else {
      follow(shop._id);
    }
  };

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5">
      {/* Shop Header */}
      <section className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 bg-primary-background p-6 rounded-lg shadow-md">
          {/* Shop Info */}
          <div className="flex items-center gap-6 flex-col md:flex-row">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-24 h-24 object-cover rounded-full shadow-md"
            />
            <div>
              <h2 className="text-3xl font-bold text-primary-text">
                {shop.name}
              </h2>
              <p className="text-secondary-text">{shop.description}</p>
              <p className="text-success-color font-medium mt-2">
                {shop.followers.length} Followers
              </p>
            </div>
          </div>

          {/* Follow/Unfollow Button */}
          <button
            onClick={toggleFollow}
            className={`flex items-center gap-2 px-6 py-3 rounded-md shadow-md text-primary-white font-semibold transition duration-300 ${
              shop.followers.includes(userProfile?._id)
                ? "bg-error-color hover:bg-error-color/90"
                : "bg-primary-brand hover:bg-secondary-brand"
            }`}
          >
            {shop.followers.includes(userProfile?._id) ? (
              <>
                <FaUserMinus /> Unfollow
              </>
            ) : (
              <>
                <FaUserPlus /> Follow
              </>
            )}
          </button>
        </div>
      </section>
      <hr className="border-t border-primary-brand container mx-auto my-14 lg:my-10" />
      {/* Products Section */}
      <section className="container mx-auto">
        <SectionTitle
          title="Shop Products"
          description={`Browse items from ${shop.name}`}
        />
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
    </div>
  );
};

export default Shop;
