import CreateProductScreen from "@/app/components/screens/vendor/product/CreateProductScreen";
import Footer from "@/app/components/shared/navigations/footer";
import NavBar from "@/app/components/shared/navigations/NavBar";
import React from "react";

const CreateProduct = () => {
  return (
    <>
      <NavBar />
      <CreateProductScreen />
      <Footer />
    </>
  );
};

export default CreateProduct;
