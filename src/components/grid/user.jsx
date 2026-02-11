import Image from "next/image";
import { useState, useEffect } from "react";

const Standard_Avatar = ({ user, style }) => {
  const { name, email, category, profile, image, image1, image2, quantity } =
    user || {};
  const [imgSrc, setImgSrc] = useState(profile);

  useEffect(() => {
    setImgSrc(profile);
  }, [profile]);

  const profileImages = [];
  if (image) profileImages.push(image);
  if (image1) profileImages.push(image1);
  if (image2) profileImages.push(image2);

  const hasMultipleImages = profileImages.length > 1;
  const imageRadius =
    style?.radius || (hasMultipleImages ? "rounded-xl" : "rounded-full");

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center">
        {hasMultipleImages ? (
          <div className="flex items-center">
            {profileImages.slice(0, 3).map((img, index) => (
              <div
                key={index}
                className={`w-12 h-12 ${imageRadius} overflow-hidden shadow-md`}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 10 + index,
                  marginLeft: index !== 0 ? "-42px" : "0",
                  border: style?.border || "1px solid #e5e7eb",
                  ...style,
                }}
              />
            ))}
            {quantity && profileImages.length > 1 && (
              <div
                className={`w-12 h-12 ${imageRadius} text-white bg-black/50  text-sm font-semibold flex items-center justify-center shadow-lg`}
                style={{
                  marginLeft: "-48px",
                  zIndex: "18",
                  border: style?.border || "2px solid white",
                  ...style,
                }}
              >
                +{quantity}
              </div>
            )}
          </div>
        ) : (
          profile && (
            <div
              className={`w-12 h-12 overflow-hidden shadow-md ${imageRadius}`}
              style={{
                border: style?.border || "1px solid #e5e7eb",
                ...style,
              }}
            >
              <Image
                src={imgSrc || "/assets/icon/no_profile_icon.svg"}
                alt={name || "User"}
                className={`w-full h-full object-cover ${imageRadius}`}
                fill
                unoptimized
                onError={() => setImgSrc("/assets/icon/no_profile_icon.svg")}
              />
            </div>
          )
        )}
      </div>

      {(name || email || category) && (
        <div className="flex-1 min-w-0">
          {name && (
            <div className="font-medium text-gray-900 truncate">
              {name}
              {hasMultipleImages && quantity && (
                <span className="text-[#00A78E] ml-1">+{quantity} more</span>
              )}
            </div>
          )}
          {email && (
            <div
              className={`text-gray-500 text-sm ${
                !name ? "font-medium text-gray-900" : ""
              } truncate`}
            >
              {email}
            </div>
          )}
          {category && (
            <div
              className={`text-gray-500 text-sm ${
                !name ? "font-medium text-gray-900" : ""
              } truncate`}
            >
              {category}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Standard_Avatar;
