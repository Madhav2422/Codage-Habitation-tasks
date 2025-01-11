"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setToken(null);
    router.push("/auth/login");
  };

  useEffect(() => {}, [token]);

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/">My App</Link>
        </h1>
        <div className="space-x-4">
          {!token ? (
            <>
              <Link
                href="/auth/login"
                className="hover:bg-blue-600 px-3 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="hover:bg-blue-600 px-3 py-2 rounded transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            pathname === "/dashboard" && (
              <button
                onClick={handleLogout}
                className="hover:bg-blue-600 px-3 py-2 rounded transition"
              >
                Logout
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
