"use client";

import InputField from "../../../shared/input-fields/InputFields";
import FileUpload from "../../../shared/ReusableFileSelect";
import { useForm } from "../../../../../../hooks/useForm";
import { toast } from "react-toastify";
import { handleInputChangeWithComma } from "@/app/helpers/utils";
import { useAppDispatch } from "../../../../../../redux/store";
import { createProduct } from "../../../../../../redux/slices/productsSlice";
import { useHydrateUser } from "@/helper/user";
import { useState } from "react";
import { Button } from "../../../shared/buttons/Button";

interface UserData {
  user: {
    _id: string;
    // firstName: string;
    // lastName: string;
    // email: string;
    // status: string,
    // role: string,
  };
  // token: string
}

interface details {
  productName: string;
  price: string;
  stockQty: string;
  description: string;
  images: null | File[];
}

const initialState = {
  productName: "",
  price: "",
  stockQty: "",
  description: "",
  images: [],
};
const CreateProductScreen = () => {
  const dispatch = useAppDispatch();
  const { userData } = useHydrateUser() as {
    userData: UserData;
    isHydrated: boolean;
  };
  const [loading, setLoading] = useState(false);
  const { formData, setFormData, errors, setErrors, handleChange, validate } =
    useForm<details>(initialState);
  const requiredFields = Object.keys(formData) as (keyof typeof formData)[];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData?.images && formData?.images?.length === 3) {
      toast.error("Maximum number of files is 3");
      e.target.value = "";
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      selectedFiles.forEach((selectedFile: File) => {
        if (selectedFile.size > 5 * 1024 * 1024) {
          toast.error("All files should be less than 5mb");
          return;
        }
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: prevFormData.images
          ? [...prevFormData.images, ...selectedFiles]
          : selectedFiles,
      }));
      e.target.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images:
        prevFormData?.images &&
        prevFormData?.images.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!validate(requiredFields)) return;
    if (formData.images?.length === undefined || formData.images?.length < 1) {
      setErrors((prev) => ({
        ...prev,
        images: "Atleast one image is required",
      }));
      return;
    }

    setLoading(true);
    const payload = new FormData();

    payload.append("productName", formData.productName);
    payload.append("price", formData.price);
    payload.append("stockQty", formData.stockQty);
    payload.append("description", formData.description);
    formData.images.forEach((image) => {
      payload.append("images", image);
    });

    dispatch(
      createProduct({
        id: userData?.user?._id,
        payload,
      })
    )
      .unwrap()
      .then((res) => {
        toast.success("Product created successfully");
        setFormData(initialState);
      })
      .catch((error) => toast.error(error?.messahe))
      .finally(() => setLoading(false));
  };

  return (
    <div className="pt-20 md:px-10 pb-10">
      <div className="max-w-[1000px] w-full mx-auto text-black py-10 px-5 md:px-10">
        <h1 className="font-semibold text-2xl">Create Product</h1>
        <div className="flex flex-col gap-5 mt-8">
          <InputField
            label="Product Name"
            name="productName"
            error={errors.productName}
            value={formData.productName}
            onChange={handleChange}
          />
          <div className="flex gap-5">
            <div className="w-full">
              <InputField
                label="Price"
                name="price"
                error={errors.price}
                value={Number(formData.price).toLocaleString()}
                onChange={(e) => handleInputChangeWithComma(e, setFormData)}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Quantity"
                name="stockQty"
                error={errors.stockQty}
                value={Number(formData.stockQty).toLocaleString()}
                onChange={(e) => handleInputChangeWithComma(e, setFormData)}
              />
            </div>
          </div>
          <FileUpload
            files={formData.images}
            label="Select Files"
            accept="image/*"
            error={errors.images}
            onChange={handleFileChange}
            onRemove={handleRemoveFile}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-[11.52px] md:text-sm font-medium  w-full border mt-5 p-4 rounded-md"
          >
            Description
            <div className="flex items-center">
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full focus:outline-none text-black text-base"
              ></textarea>
            </div>
          </label>
          {errors.description && (
            <p className="text-xs text-red-600">{errors.description}</p>
          )}
        </div>
        <div className="flex justify-end mt-5">
          <Button
            loading={loading}
            onClick={handleSubmit}
            className="w-[130px]"
          >
            Create product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductScreen;
