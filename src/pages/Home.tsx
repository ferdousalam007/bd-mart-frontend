import Hero from "../components/Hero";
import Categories from "../components/Home/Categories";
import FlashSale from "../components/Home/FlashSale";
import ScrollToTop from "../components/Home/ScrollTop";
import AvailableProducts from "./AvalibleProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FlashSale />
      <AvailableProducts />
      <ScrollToTop />
    </>
  );
};

export default Home;
