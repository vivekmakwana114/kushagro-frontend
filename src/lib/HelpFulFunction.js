import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export const UserRowProfile = ({ image, name, email, time }) => {
  return (
    <div className="w-auto flex flex-row items-center space-x-2">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={image || "https://github.com/leerob.png"}
          alt="user"
          className="rounded-full"
        />
        <AvatarFallback>N/A</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[4px]">
        <span className="text-sm font-medium text-[#282928]">{name}</span>
        <span className="text-xs text-[var(--color-dull-text)]">
          {email || time}
        </span>
      </div>
    </div>
  );
};

export const ProductRowProfile = ({ image, productName }) => {
  return (
    <div className="w-auto flex flex-row items-center space-x-2">
      <Avatar className="w-10 h-10 rounded-[8px] border border-secondary1">
        <AvatarImage
          src={image || "https://github.com/leerob.png"}
          alt="user"
        />
        <AvatarFallback>N/A</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[4px]">
        <span className="text-sm font-medium text-black">{productName}</span>
      </div>
    </div>
  );
};

export const GetStatusBadge = ({ status }) => {
  return (
    <Badge
      className={
        status === "active"
          ? "bg-[#EAFFED] text-[#097416] px-[8px] py-[12px] w-[75px] h-[31px] rounded-[4px]  text-center "
          : status === "inactive"
          ? "bg-[#EEEEEE] text-[#7B7B7B``] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "suspended"
          ? "bg-[#FFF0F1 ] text-[#BC0D10] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "upcoming"
          ? "bg-[#E5FCFF] text-[#02C8DE] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "completed"
          ? "bg-[#EAFFED] text-[#097416] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "cancelled"
          ? "bg-[#FFF0F0] text-[#BC0D10] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "pending"
          ? "bg-[#FFF6E8] text-[#FF9800] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "shipped"
          ? "bg-[#E5FCFF] text-[#02C8DE] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "returned"
          ? "bg-[#F0F0F0] text-[#7B7B7B] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "delivered"
          ? "bg-[#FFF0F0] text-[#BC0D10] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "paid"
          ? "bg-[#EAFFED ] text-[#097416] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "inprocess"
          ? "bg-[#FFFAE9] text-[#FF9800] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "expired"
          ? "bg-[#FFF0F0] text-[#BC0D10] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "open"
          ? "bg-[#EEEEEE] text-[#7B7B7B] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "resolved"
          ? "bg-[#EAFFED] text-[#097415] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : status === "checking"
          ? "bg-[#E5FCFF] text-[#02C8DE] px-[8px] py-[4px] w-[75px] h-[31px] rounded-[4px]  text-center"
          : ""
      }
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const getUserFromToken = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    const { tokens } = JSON.parse(raw);
    const token = tokens?.accessToken;
    if (!token) return null;
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch {
    return null;
  }
};
