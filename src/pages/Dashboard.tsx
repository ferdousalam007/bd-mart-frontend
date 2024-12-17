import { useEffect, useState } from "react";
import { useVendorShop } from "../hooks/shops/useVendorShop";
import { useCreateShop } from "../hooks/shops/useCreateShop";
import Button from "../components/Button";
import { useUserProfile } from "../hooks/users/useUserProfile";
import SectionTitle from "../components/SectionTitle";
import { useUpdateShop } from "../hooks/shops/useUpdateShop";
import StatsCard from "../components/StatsCard";
import { RxCross2 } from "react-icons/rx";
// import {
//   FaCar,
//   FaClipboardList,
//   FaHourglassHalf,
//   FaMoneyBillWave,
// } from "react-icons/fa6";
import api from "../services/api";
import Dropzone from "react-dropzone";
import axios from "axios";

const VendorShops = () => {
  const [shopData, setShopData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { userProfile } = useUserProfile();
  const { shop } = useVendorShop();
  const { create, isPending: isCreatePending } = useCreateShop();
  const { update, isPending: isUpdatePending } = useUpdateShop();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (shop) {
      setShopData({
        name: shop.name,
        image: shop.image,
        description: shop.description,
      });
      setUploadedImage(shop.image);
    }
  }, [shop]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedShopData = {
      ...shopData,
      image: uploadedImage || shopData.image,
      vendor: userProfile._id,
    };

    if (shop) {
      update({
        updatedShop: updatedShopData,
        shopId: shop._id,
      });
    } else {
      create(updatedShopData);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uzsgpleh"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfsbi29k5/image/upload", // Replace with your Cloudinary upload URL
        formData
      );
      setUploadedImage(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const [counts, setCounts] = useState({
    productCount: 0,
    userCount: 0,
    orderCount: 0,
    totalEarning: 0,
  });

  useEffect(() => {
    api.get("/model-counts").then((res) => {
      setCounts(res.data);
    });
  }, []);

  return (
    <div className="bg-primary-background lg:py-14 py-10 px-5">
      {userProfile.role === "admin" ? (
        <div className="bg-primary-background">
          {/* Header */}
          <SectionTitle title="Analitycs" />
          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              title="Total Products"
              value={counts.productCount}
              textColor="text-primary-brand"
      
            />
            <StatsCard
              title="Total Orders"
              value={counts.orderCount}
              textColor="text-success-color"
      
            />
            <StatsCard
              title="Total Earnings"
              value={`$${counts.totalEarning}`}
              textColor="text-error-color"
      
           
            />
            <StatsCard
              title="Total Users"
              value={counts.userCount}
              textColor="text-warning-color"
            
             
            />
          </section>
        </div>
      ) : (
        <div className="mx-auto">
          <SectionTitle title={shop ? "Update Shop" : "Create Shop"} />
          {/* Create Shop Form */}
          <div className="bg-primary-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-secondary-text text-sm font-medium mb-2">
                  Shop Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shopData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-primary-grey rounded-md focus:outline-none focus:ring-2 focus:ring-primary-brand"
                  placeholder="Enter shop name"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-secondary-text text-sm font-medium mb-2">
                  Shop Image
                </label>
                <Dropzone
                  onDrop={onDrop}
                  accept={{
                    "image/png": [".png"],
                    "image/webp": [".webp"],
                    "image/jpg": [".jpg"],
                    "image/jpeg": [".jpeg"],
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="w-full px-8 py-3 border border-secondary-grey hover:border-primary-brand rounded-md cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <div className="flex justify-center text-4xl">
                        {/* Add an icon here if needed */}
                      </div>
                      <p className="text-secondary-text text-center">
                        Drag and drop an image here, or click to select an image
                      </p>
                      {loading && (
                        <p className="text-primary-text text-center">
                          Uploading...
                        </p>
                      )}
                    </div>
                  )}
                </Dropzone>
                {uploadedImage && (
                  <div className="mt-2 relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="h-24 w-24 rounded-md object-cover border border-red-500 p-1"
                    />
                    <button
                      type="button"
                      className="absolute   top-0 left-0 bg-error-color text-primary-white rounded-full p-1 hover:bg-red-700"
                      onClick={removeImage}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-secondary-text text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={shopData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-primary-grey rounded-md focus:outline-none focus:ring-2 focus:ring-primary-brand"
                  placeholder="Enter shop description"
                  rows={4}
                ></textarea>
              </div>
              <Button
                loading={isCreatePending || isUpdatePending}
                disabled={isCreatePending || isUpdatePending}
              >
                {shop ? "Update" : "Create"}
                Shop
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorShops;
