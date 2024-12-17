import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/products/useAllProducts";
import { Link } from "react-router-dom";
import CompareButton from "../components/CompareButton";
import AddToCartButton from "../components/AddToCartButton";
import { useUserProfile } from "../hooks/users/useUserProfile";
import { useAllCategories } from "../hooks/categories/useAllCategories";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const AvailableProducts = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    priceRange: [0, 2000],
    category: "",
  });
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 10;

  const { userProfile } = useUserProfile();
  const { categories } = useAllCategories();
  const { products, isLoading, error } = useAllProducts({
    sort: "-_id",
  });
  console.log("products", products);
  useEffect(() => {
    if (products) {
      const followedShopProducts = products.filter((product: any) =>
        userProfile?.followedShops?.includes(product.shop?._id)
      );
      console.log(products);

      const otherProducts = products.filter(
        (product: any) =>
          !userProfile?.followedShops?.includes(product.shop?._id)
      );

      const prioritizedProducts = [...followedShopProducts, ...otherProducts];

      const newFilteredProducts = prioritizedProducts.filter((product) => {
        const matchesKeyword = product.name
          .toLowerCase()
          .includes(filters.keyword.toLowerCase());
        const matchesPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];
        const matchesCategory =
          !filters.category || product.category.name === filters.category;

        return matchesKeyword && matchesPrice && matchesCategory;
      });
      setFilteredProducts(newFilteredProducts as any);
    }
  }, [products, filters, userProfile]);

  useEffect(() => {
    const newPageProducts = filteredProducts.slice(0, page * productsPerPage);
    setDisplayedProducts(newPageProducts);
    setHasMore(newPageProducts.length < filteredProducts.length);
  }, [filteredProducts, page]);

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error?.message}
      </h2>
    );

  return (
    <div className="bg-gray-200 pt-16 pb-20 px-5 ">
      <section className="container mx-auto ">
        <SectionTitle
          title="Products"
          description={`Browse all products in this shop`}
        />
        <div className="flex flex-1 flex-col">
          <label htmlFor="priceRange" className="text-sm  font-medium">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <input
            type="range"
            name="priceRange"
            min="0"
            max="2000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [0, parseInt(e.target.value, 10)],
              })
            }
            className="flex-1 p-3"
          />
        </div>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            placeholder="Search"
            className="flex-1 p-3 border rounded shadow focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="flex-1 p-3 border rounded shadow focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
          >
            <option value=""> Categories</option>
            {categories?.map((category: any) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <InfiniteScroll
          dataLength={displayedProducts.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          scrollThreshold={0.5}
          loader={<Spinner />}
          endMessage={<p className="text-center text-gray-500 mt-4"></p>}
          style={{ overflow: "hidden" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedProducts.map((product: any) => (
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
                  <span className="text-red-800 text-sm mr-1 uppercase">
                    <span className="font-bold text-slate-800">
                      {" "}
                      Category :{" "}
                    </span>{" "}
                    {product.category.name}
                  </span>
                  <span className="text-red-800 text-sm mr-1 uppercase pt-2">
                    <span className="font-bold text-slate-800"> shop : </span>
                    {product.shop.name}
                  </span>
                </div>
                {/* Prices */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-500 text-lg font-bold">
                    ${product.price.toFixed(2)}
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
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default AvailableProducts;
