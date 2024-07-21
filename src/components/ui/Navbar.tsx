"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
    <nav className=" shadow-md border-b-2 border-b-black  dark:border-b-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          {/* <MountainIcon className="h-8 w-8" /> */}
          <span className="text-xl font-bold">Acme Inc</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="movies" className="hover:underline">
            Movies
          </Link>
          <Link href="/contactus" className="hover:underline">
            Contact Us
          </Link>
          <Link href="aboutus" className="hover:underline">
            About Us
          </Link>
        </div>
        <div className=" md:block hidden ">
          <div className="flex justify-center items-center">
            <ModeToggle></ModeToggle>
            {/* Desktop Login Button */}

            {user.user ? (
              <Button
                className="bg-primary  text-primary-foreground px-4 py-2 rounded-md  w-full border-2 border-white mx-6"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full border-2 border-white mx-6">
                <Link href="/login">login</Link>
              </Button>
            )}
          </div>
        </div>
        {/* Mobile Menu Button */}
        <Button
          className="md:hidden flex items-center p-2 bg-black"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-6 w-6  fill-white "
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden  py-2 ">
          <div className="container mx-auto px-4">
            <Link href="/" className="block py-2 hover:underline">
              Home
            </Link>
            <Link href="/movies" className="block py-2 hover:underline">
              Movies
            </Link>
            <Link href="/contactus" className="block py-2 hover:underline">
              Contact Us
            </Link>
            <Link href="/aboutus" className="block py-2 hover:underline">
              About Us
            </Link>
          </div>
          <div className="ml-10 my-4">
            <ModeToggle></ModeToggle>
          </div>

          <div className="flex justify-center items-center">
            {user.user ? (
              <Button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md mt-4 w-[90%] "
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md mt-4 w-[90%] ">
                <Link href="/login">login</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
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
