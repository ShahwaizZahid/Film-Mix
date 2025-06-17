"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Mail, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white/70 dark:bg-black/70 border-t border-white/10 dark:border-white/10 shadow-inner backdrop-blur-md mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Logo and About */}
        <div className="space-y-4 text-center md:text-left">
          <Link
            href="/"
            className="text-2xl font-bold text-purple-600 dark:text-purple-400"
          >
            Filmix
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your go-to platform for streaming top-rated films and discovering
            new favorites across all genres.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Quick Links
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <Link href="/" className="hover:text-purple-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className="hover:text-purple-500">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-purple-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-purple-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-start items-center gap-4 text-muted-foreground">
            <Link
              href="https://github.com/ShahwaizZahid/"
              target="_blank"
              aria-label="GitHub"
              className="hover:text-purple-500 transition-transform hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/shahwaiz-zahid/"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition-transform hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 py-4 text-sm text-center text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-purple-500">Filmix</span>. All
        rights reserved. Built with ❤️ by{" "}
        <a
          href="https://github.com/shahwaiz-dev"
          target="_blank"
          className="underline hover:text-purple-500"
        >
          Shahwaiz
        </a>
      </div>
    </footer>
  );
}
