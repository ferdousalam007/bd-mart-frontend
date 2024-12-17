import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Dropzone from "react-dropzone";
import axios from "axios";
import Button from "../Button";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { useCreateCategory } from "../../hooks/categories/useCreateCategory";

interface FormData {
  name: string;
  image: string;
}

const CategoryModal: React.FC<any> = ({
  modalIsOpen,
  setModalIsOpen,
  category,
}) => {
  const { update } = useUpdateCategory();
  const { create } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        image: category.image,
      });
      setUploadedImage(category.image);
    } else {
      reset({
        name: "",
        image: "",
      });
      setUploadedImage(null);
    }
  }, [category, reset]);

  const onSubmit = (newCat: FormData) => {
    clearErrors("image");
    newCat.image = uploadedImage || "";

    if (category) {
      update({
        updatedCategory: newCat,
        categoryId: category?._id,
      });
    } else {
      create(newCat);
    }
    closeModal();
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uzsgpleh");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfsbi29k5/image/upload",
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

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Category Details"
          className="container z-50 mx-5"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative md:w-2/3 mx-auto max-h-[80vh] overflow-auto rounded-lg bg-primary-background p-8 shadow-lg"
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full bg-primary-white p-2 text-xl text-primary-grey shadow-lg transition-transform duration-300 will-change-transform hover:scale-90 lg:text-2xl"
            >
              <RxCross2 />
            </button>
            <h2 className="text-2xl font-semibold text-primary-text mb-4 text-center">
              {category ? "Edit category" : "Add new category"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter category name"
                />
                {errors.name && (
                  <p className="text-error-color text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Image
                </label>
                <Controller
                  name="image"
                  control={control}
                  rules={{
                    validate: () =>
                      uploadedImage !== null || "An image is required",
                  }}
                  render={({ field }) => (
                    <Dropzone
                      onDrop={async (acceptedFiles) => {
                        const imgUrl = await onDrop(acceptedFiles);
                        field.onChange(imgUrl);
                      }}
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
                            {/* <IoMdCloudUpload className="text-primary-brand" /> */}
                          </div>
                          <p className="text-secondary-text text-center">
                            Upload category image
                          </p>
                          {loading && (
                            <p className="text-primary-text text-center">
                              Uploading...
                            </p>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  )}
                />
                {errors.image && (
                  <p className="text-error-color text-sm">
                    {errors.image.message}
                  </p>
                )}
                {uploadedImage && (
                  <div className="mt-2 relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-error-color text-primary-white rounded-full p-1 hover:bg-red-700"
                      onClick={removeImage}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                )}
              </div>

              <Button className="w-full" disabled={loading} loading={loading}>
                {category ? "Update category" : "Add category"}
              </Button>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
