import VendorProductsScreen from "@/app/components/screens/vendor/product/VendorProductsScreen";
import Footer from "@/app/components/shared/navigations/footer";
import NavBar from "@/app/components/shared/navigations/NavBar";
import React from "react";

const VendorProductsPage = () => {
  return (
    <div>
      <NavBar />
      <VendorProductsScreen />
      <Footer />
    </div>
  );
};

export default VendorProductsPage;
