import { Link,  useNavigate } from "react-router-dom";

const Banner = () => {
  const Navigate = useNavigate();
 
  return (
    <section className="banner py-8 px-5 md:py-0 md:px-0 flex flex-col justify-center items-center ">
      <div className="container pt-[150px] pb-[140px] grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl lg:text-4xl xl:text-4xl text-white font-medium  mb-8 capitalize tracking-wide  ">
            Welcome to BD Mart
            <br /> – Shop Smarter,
            <br /> Live Better!
          </h2>
          <p className="text-white  mt-5 mb-10">
            Discover a seamless online shopping experience at BD Mart. Explore a
            wide range of products, manage your shop effortlessly as a vendor,
            and enjoy secure, high-performance service for all your needs.
          </p>
          <Link
            to="/products"
            className="px-6 py-4 mr-3  bg-slate-700 text-white rounded hover:bg-secondary-brand"
          >
            Shop Now
          </Link>
          <button
            onClick={() => Navigate("/products?discount[gt]=0")}
            className="px-6 py-4  bg-primary-brand text-slate-700 rounded hover:bg-secondary-brand"
          >
            Flash Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
