import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="bg-white py-4 px-8 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight hover:text-indigo-600 transition-all">
            Algo<span className="text-indigo-600">Scripts</span>
          </h1>
        </Link>

        {/* Navigation links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            className="text-lg text-gray-700 hover:text-indigo-600 transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-lg text-gray-700 hover:text-indigo-600 transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* User Authentication */}
      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-lg text-gray-800">{user.given_name}</p>
          <LogoutLink
            className={`${buttonVariants({
              variant: "secondary",
            })} bg-indigo-600 hover:bg-indigo-700 text-white`}
          >
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink
            className={`${buttonVariants()} bg-indigo-600 hover:bg-indigo-700 text-white`}
          >
            Log in
          </LoginLink>
          <RegisterLink
            className={`${buttonVariants({
              variant: "secondary",
            })} bg-gray-200 hover:bg-gray-300 text-gray-800`}
          >
            Sign up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
