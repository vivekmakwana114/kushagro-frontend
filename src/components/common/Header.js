"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RiMenu3Fill } from "react-icons/ri";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { LuBellDot } from "react-icons/lu";
import Image from "next/image";
import { useSideBarStore } from "@/state/useSideBar";
import { usePathname } from "next/navigation";

import { useBreadcrumbStore } from "@/state/useBreadcrumbStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/state/auth/authSlice";

import { useEffect, useRef, useState, Fragment } from "react";
import Notification from "@/components/common/Notification";

// Map of routes to their display names
const routeMap = {
  "/": "Dashboard",

  "/buyer": "Buyer",
  "/buyer/details": "Buyer Details",
  "/buyer/details/product-order": "Product Orders",

  "/seller": "Seller",
  "/seller/details/profile": "Seller Details",
  "/seller/details/seller": "Seller",

  "/listing-categories": "Listing & Categories",
  "/listing-categories/categories": "Categories",

  "/payment-and-payouts/all-transaction": "All Transaction",

  "/profile": "My Profile",

  "/settings": "Settings",
  "/settings/tax-commission": "Tax Commission",
  "/settings/push-alerts": "Push Alerts",
  "/settings/support-ticket": "Support Ticket",
  "/settings/fraud-report": "Fraud Report",
  "/settings/policies": "Policies",
  "/settings/email": "Email Settings",
  "/settings/payments": "Payments",
};

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toggle, isOpen } = useSideBarStore();
  const pathname = usePathname();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { dynamicCrumb } = useBreadcrumbStore();

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter((s) => s);
    let currentPath = "";
    const breadcrumbs = [];

    // Build the full path and find matching route
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      if (routeMap[currentPath]) {
        breadcrumbs.push({
          href: currentPath,
          label: routeMap[currentPath],
        });
      }
    });

    // Add dynamic crumb if present
    if (dynamicCrumb) {
      breadcrumbs.push({ href: "#", label: dynamicCrumb.label });
    }

    if (pathname === "/settings") {
      breadcrumbs.push({
        href: "/settings",
        label: "General Settings",
      });
    }
    if (pathname === "/listing-categories") {
      breadcrumbs.push({
        href: "/listing",
        label: "Listings",
      });
    }

    if (breadcrumbs.length === 0) {
      const routeName =
        pathname === "/" ? "Dashboard" : pathname.split("/").pop();
      breadcrumbs.push({
        href: pathname,
        label: routeName.charAt(0).toUpperCase() + routeName.slice(1),
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex items-center justify-between h-full px-6">
      <div className="hidden md:flex">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <Fragment key={`${breadcrumb.href}-${index}`}>
                  <BreadcrumbItem>
                    {!isLast ? (
                      <BreadcrumbLink
                        href={breadcrumb.href}
                        className="text-sm font-medium text-black hover:text-secondary1 hover:underline"
                      >
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-sm font-medium text-black">
                        {breadcrumb.label}
                      </span>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="mx-2"></BreadcrumbSeparator>
                  )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="md:hidden flex items-center">
        <Image
          src="/assets/logo/Mobile_KushAgro.svg"
          alt="logo"
          width={40}
          height={40}
        />
      </div>

      <div className="flex items-center sm:gap-2 gap-3">
        {/* Notification Pane */}
        <div className="relative" ref={notificationRef}>
          <div
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="w-[30px] h-[30px] border border-(--border-admin) 
                   rounded-[6px] flex items-center justify-center shadow-md cursor-pointer"
          >
            <Image
              src="/assets/icon/notification.svg"
              alt="Menubar"
              width={16}
              height={16}
            />
          </div>

          <Notification
            isOpen={isNotificationOpen}
            heading="Notification Feed"
            subHeading="Your central hub for platform-wide alerts and operational updates."
            onClose={() => setIsNotificationOpen(false)}
          />
        </div>

        <div className="flex flex-row gap-2 items-center ">
          <div className="hidden md:flex md:flex-col gap-0.5">
            <div className="flex items-center justify-end">
              <p className="text-[12px] font-medium text-placeholder-color text-left">
                Hello
              </p>
            </div>
            <p className="text-[14px] font-medium text-(--dark) truncate">
              John Doe
            </p>
          </div>

          {/* Avatar with dropdown - shows on both mobile and desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                <Avatar className={`size-8 md:size-12 border-2`}>
                  <AvatarImage
                    src="/profile.jpg"
                    alt="User Avatar"
                    className="object-cover"
                  />
                  {/* <AvatarFallback>
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback> */}
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            {/* </DropdownMenuTrigger> */}
            {/* <DropdownMenu> */}
            <DropdownMenuContent className="w-48 mt-2 mr-2" align="end">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer p-3"
                onClick={() => router.push("/profile")}
              >
                <User className="text-dull-text h-4 w-4" />
                <span className="text-dull-text">My Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer p-3 "
                onClick={() => {
                  dispatch(logout());
                  router.push("/auth");
                }}
              >
                <LogOut className="text-dull-text h-4 w-4" />
                <span className="text-dull-text">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hamburger Menu */}
          <div
            className="flex md:hidden w-[30px] h-[30px] border border-(--border-admin) rounded-[6px] items-center justify-center shadow-md cursor-pointer"
            onClick={toggle}
            data-hamburger="true"
          >
            <Image
              src="/assets/icon/hamburger.svg"
              alt="Menubar"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
