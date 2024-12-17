import SectionTitle from "../SectionTitle";
import Spinner from "../../components/Spinner";
import { useAllCategories } from "../../hooks/categories/useAllCategories";
import { Link } from "react-router-dom";

const Categories = () => {
  const { isLoading, error, categories } = useAllCategories();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error.message}
      </h2>
    );

  return (
    <section className="border-b border-secondary-grey py-10 container mx-auto">
      <SectionTitle
        title="Categories"
        description="See all categories"
        className="text-center"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 place-items-center">
        {categories.map((category: any) => (
          <div key={category._id} className="flex  ">
            <Link to={`/products?category=${category._id}`}>
              <div
                className="w-24 h-24    bg-cover bg-center rounded hover:scale-95 transition duration-300 shadow-md flex justify-center items-center"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <p className="text-white text-center text-lg font-semibold bg-black/40 rounded-full px-2 py-1">
                  {category.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
