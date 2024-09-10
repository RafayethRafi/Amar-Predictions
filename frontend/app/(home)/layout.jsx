"use client";

import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function HomeLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  return <>{children}</>;
}