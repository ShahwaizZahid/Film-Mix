"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/Auth";
import { ModeToggle } from "./theme";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuthContext();
  const logoutMutation = useLogout();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      if (user) {
        await logoutMutation.mutateAsync();
        setUser({ message: "", user: null });
      }
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };
  return (
    // ...existing code...
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-lg border-b border-border transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            className="fill-black dark:fill-white w-6 h-6 group-hover:scale-110 transition-transform"
          >
            <path d="m24,8.086l-4,4v-1.086c0-1.344-.888-2.484-2.108-2.865.693-.858,1.108-1.949,1.108-3.135,0-2.757-2.243-5-5-5-1.634,0-3.087.788-4,2.003-.913-1.216-2.366-2.003-4-2.003C3.243,0,1,2.243,1,5c0,1.186.416,2.277,1.108,3.135-1.22.381-2.108,1.521-2.108,2.865v13h20v-4.086l4,4v-15.828ZM14,2c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm-8,0c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm12,20H2v-11c0-.551.449-1,1-1h14c.551,0,1,.449,1,1v11Zm4-2.914l-2-2v-2.172l2-2v6.172Z" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            FilmMix
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/movies", label: "Movies" },
            { href: "/contactus", label: "Contact Us" },
            { href: "/aboutus", label: "About Us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-2 py-1 font-medium transition-colors duration-200 hover:text-purple-600 dark:hover:text-pink-400
            after:content-[''] after:block after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Theme + Auth */}
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          {user.user ? (
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md border-2 border-white mx-2 shadow-md hover:scale-105 transition-transform"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md border-2 border-white mx-2 shadow-md hover:scale-105 transition-transform">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden flex items-center p-2 bg-black/70 hover:bg-black/90 transition"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-6 w-6 fill-white"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex flex-col md:hidden animate-fade-in">
          <div className="bg-white/90 dark:bg-black/90 rounded-b-2xl shadow-lg mx-2 mt-2 p-6 flex flex-col gap-4">
            {[
              { href: "/", label: "Home" },
              { href: "/movies", label: "Movies" },
              { href: "/contactus", label: "Contact Us" },
              { href: "/aboutus", label: "About Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-lg font-semibold hover:text-purple-600 dark:hover:text-pink-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex justify-center items-center gap-2 mt-4">
              <ModeToggle />
              {user.user ? (
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md w-full shadow-md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md w-full shadow-md">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
    // ...existing code...
  );
}

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function useLogout() {
  const router = useRouter();

  return useMutation<any, AxiosError>({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await axios.get("/api/users/logout");
    },
    onSuccess: () => {
      toast.success("Logout successful!");
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during logout";

      toast.error(errorMessage);
    },
  });
}
