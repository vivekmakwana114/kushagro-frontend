"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { tokens } = useSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isAuthRoute = pathname.startsWith("/auth");

    // If authenticated and on auth page, redirect to dashboard
    if (tokens && isAuthRoute) {
      router.replace("/");
    }
    // If not authenticated and NOT on auth page, redirect to auth
    else if (!tokens && !isAuthRoute) {
      router.replace("/auth");
    }
  }, [tokens, pathname, router, mounted]);

  if (!mounted) return null;

  return children;
}
