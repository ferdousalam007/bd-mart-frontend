
import Banner from "../components/Banner";
import Categories from "../components/Home/Categories";
import FlashSale from "../components/Home/FlashSale";
import ScrollToTop from "../components/Home/ScrollTop";
import AvailableProducts from "./AvalibleProducts";

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <FlashSale />
      <AvailableProducts />
      <ScrollToTop />
    </>
  );
};

export default Home;
