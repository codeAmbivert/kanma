import Layout from "@/app/components/layout/UserLayout";
import SingleOrdersScreen from "@/app/components/screens/vendor/orders/SingleOrdersScreen";
import React from "react";

const OrdersPage = () => {
  return (
    <Layout>
      <SingleOrdersScreen />
    </Layout>
  );
};

export default OrdersPage;
