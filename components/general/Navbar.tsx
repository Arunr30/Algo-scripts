"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);

  return (
    <nav className="bg-white border-b px-6 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-indigo-600"
        >
          Algo<span className="text-gray-800">Scripts</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-indigo-600 text-gray-700 text-lg"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-indigo-600 text-gray-700 text-lg"
          >
            Dashboard
          </Link>
        </div>

        {/* Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-800">Hi, {user.given_name}</p>
            <LogoutLink className={buttonVariants({ variant: "secondary" })}>
              Logout
            </LogoutLink>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <LoginLink className={buttonVariants()}>Log in</LoginLink>
            <RegisterLink className={buttonVariants({ variant: "secondary" })}>
              Sign up
            </RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
}
