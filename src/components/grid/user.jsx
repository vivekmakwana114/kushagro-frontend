import Image from "next/image";

const Standard_Avatar = ({ user, style }) => {
  const { name, email, category, profile, image, image1, image2, quantity } =
    user || {};

  // Helper to safely render values that might be objects
  const safeRender = (val) => {
    if (typeof val === "object" && val !== null) {
      // If it's the known wrapper, try to extract value
      if ("value" in val) return String(val.value);
      if ("name" in val) return String(val.name); // fallback for nested objects
      return JSON.stringify(val); // Last resort debugging
    }
    return val;
  };

  const safeName = safeRender(name);
  const safeEmail = safeRender(email);
  const safeCategory = safeRender(category);
  const safeProfile =
    typeof profile === "string" ? profile : profile?.value || ""; // Profile must be string for Image

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
          safeProfile && (
            <div
              className={`w-12 h-12 overflow-hidden shadow-md ${imageRadius}`}
              style={{
                border: style?.border || "1px solid #e5e7eb",
                ...style,
              }}
            >
              <Image
                src={safeProfile}
                alt={safeName || "User"}
                className={`w-full h-full object-cover ${imageRadius}`}
                fill
                unoptimized
                onError={(e) =>
                  console.error("Image load error:", safeProfile, e)
                }
              />
            </div>
          )
        )}
      </div>

      {(safeName || safeEmail || safeCategory) && (
        <div className="flex-1 min-w-0">
          {safeName && (
            <div className="font-medium text-gray-900 truncate">
              {safeName}
              {hasMultipleImages && quantity && (
                <span className="text-[#00A78E] ml-1">+{quantity} more</span>
              )}
            </div>
          )}
          {safeEmail && (
            <div
              className={`text-gray-500 text-sm ${
                !safeName ? "font-medium text-gray-900" : ""
              } truncate`}
            >
              {safeEmail}
            </div>
          )}
          {safeCategory && (
            <div
              className={`text-gray-500 text-sm ${
                !safeName ? "font-medium text-gray-900" : ""
              } truncate`}
            >
              {safeCategory}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Standard_Avatar;
