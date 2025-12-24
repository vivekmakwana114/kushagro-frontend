import Image from "next/image";
import React from "react";

const AuthSideImage = () => {
  return (
    // <div className="relative w-full h-full bg-gradient-to-t from-gradient1  via-gradient2 via-gradient3 via-gradient4 via-gradient4 to-gradient6">
    <div className="relative w-full h-full bg-primary1">
      <div className="absolute top-10 left-10 right-10 bottom-10 max-w-3xl  h-[146px] flex flex-col gap-4">
        <h2 className="text-[37px] font-bold text-secondary1">
         KushAgro Admin Panel
        </h2>
        <p className="text-[22px] text-secondary1 font-medium">
          Manage users, listings, payments, and platforms operations - all in one secure place.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex justify-center items-end">
        <Image
          src="/assets/banner/auth_banner.png"
          alt="Auth Banner"
          width={1000}
          height={1000}
          className="w-[150%] max-w-[550px] h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default AuthSideImage;
