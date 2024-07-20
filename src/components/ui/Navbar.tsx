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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          {/* <MountainIcon className="h-8 w-8" /> */}
          <span className="text-xl font-bold">Acme Inc</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#" className="hover:underline">
            Home
          </Link>
          <Link href="#" className="hover:underline">
            Movies
          </Link>
          <Link href="#" className="hover:underline">
            Contact Us
          </Link>
          <Link href="#" className="hover:underline">
            About Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <span>Theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
              <DropdownMenuItem>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Login Button */}
        <Button className="hidden md:inline-flex bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Login
        </Button>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden flex items-center p-2 text-white"
          onClick={toggleMobileMenu}
        >
          <img className="h-6 w-6" src="bars.svg" alt="hello" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white py-4">
          <div className="container mx-auto px-4">
            <Link href="#" className="block py-2 hover:underline">
              Home
            </Link>
            <Link href="#" className="block py-2 hover:underline">
              Movies
            </Link>
            <Link href="#" className="block py-2 hover:underline">
              Contact Us
            </Link>
            <Link href="#" className="block py-2 hover:underline">
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 mt-4">
                <span>Theme</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
                <DropdownMenuItem>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md mt-4 w-full">
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
