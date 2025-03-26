import VendorCategoriessScreen from "@/app/components/screens/vendor/product/VendorCategoriesScreen";
import Footer from "@/app/components/shared/navigations/footer";
import NavBar from "@/app/components/shared/navigations/NavBar";
import React from "react";

const VendorCategoriesPage = () => {
  return (
    <div>
      <NavBar />
      <VendorCategoriessScreen />
      <Footer />
    </div>
  );
};

export default VendorCategoriesPage;
