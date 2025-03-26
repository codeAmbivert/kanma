import React from "react";
import logo from "../../../../public/images/Logo.png";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center  bg-white z-[300]">
      <div className="animate-pulse">
        <Image src={logo} alt="Logo" width={200} height={200} />
        {/* Adjust the size of the logo as needed */}
      </div>
    </div>
  );
};

export default LoadingPage;
