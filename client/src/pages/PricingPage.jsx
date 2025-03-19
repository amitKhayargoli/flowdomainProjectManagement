import React from "react";
import HomeNav from "../components/HomeNav";
import Pricing from "../components/Pricing";
import Footer from "./footer";

const PricingPage = () => {
  return (
    <>
      <HomeNav></HomeNav>
      <div className="p-10">
        <Pricing></Pricing>
      </div>

      <Footer></Footer>
    </>
  );
};

export default PricingPage;
