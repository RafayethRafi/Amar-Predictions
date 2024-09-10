"use client";

import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <p>Hello, {user.name}!</p>
      ) : (
        <p>Please log in to see personalized content.</p>
      )}
    </div>
  );
}