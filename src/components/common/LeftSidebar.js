"use client";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSideBarStore } from "@/state/useSideBar";
import { leftSidebarItems } from "./SidebarData";
import Image from "next/image";

const LeftSidebar = ({ onOpenChange }) => {
  const pathname = usePathname();
  const { isOpen, closeAll } = useSideBarStore();
  const isMobile = useIsMobile();

  // Close sidebars when a navigation item is clicked on mobile
  const handleNavigation = () => {
    if (isMobile) {
      closeAll();
    }
  };

  const isActive = (url) => {
    return pathname === url || pathname.startsWith(url + "/");
  };

  const renderMenuItem = (item, index) => {
    const active = isActive(item?.url);

    // Redirect logic for barbershop role
    let href = item?.url;

    return (
      <SidebarMenuItem key={index}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild>
              <Link
                href={href}
                className="flex items-center justify-center"
                onClick={handleNavigation}
              >
                <Image
                  src={active ? item?.icon?.active : item?.icon?.inactive}
                  alt={item?.title}
                  width={60}
                  height={60}
                  className="h-12 w-12"
                />
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p>{item?.title}</p>
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    );
  };

  const currentItems = leftSidebarItems;

  const sidebarContent = (
    <SidebarContent className="flex flex-col items-center py-4 bg-white">
      <SidebarGroup className="flex flex-col items-center gap-4 w-full">
        <SidebarGroupLabel className="mb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-8 rounded-md cursor-pointer">
                <AvatarImage
                  src="/assets/logo/Mobile_KushAgro.svg"
                  alt="@shadcn"
                />
                <AvatarFallback>KushAgro</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
          </Tooltip>
        </SidebarGroupLabel>

        <hr className="w-8 h-[0.5px] border border-[var(--border-admin)]" />

        <SidebarGroupContent className="w-full">
          <SidebarMenu className="flex flex-col items-center gap-3">
            {leftSidebarItems
              .slice(0, 3)
              .map((item, index) => renderMenuItem(item, index))}

            <hr className="w-8 h-[0.5px] border border-[var(--border-admin)] my-1" />

            {leftSidebarItems
              .slice(3, 6)
              .map((item, index) => renderMenuItem(item, index + 4))}

            <hr className="w-8 h-[0.5px] border border-[var(--border-admin)] my-1" />

            {renderMenuItem(leftSidebarItems[6], 6)}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );

  return (
    <TooltipProvider>
      {isMobile ? (
        // Mobile: Controlled sidebar with overlay
        <SidebarProvider open={isOpen}>
          <Sidebar
            open={isOpen}
            onOpenChange={closeAll}
            className="fixed left-0 top-0 h-full z-50 left-sidebar"
          >
            {sidebarContent}
          </Sidebar>
        </SidebarProvider>
      ) : (
        // Desktop: Always visible sidebar
        <SidebarProvider>
          <Sidebar className="w-[72px] fixed left-0 top-0 h-full bg-white z-50">
            {sidebarContent}
          </Sidebar>
        </SidebarProvider>
      )}
    </TooltipProvider>
  );
};

export default LeftSidebar;
