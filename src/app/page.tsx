"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import "@/styles/home.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/context/Auth";
import { useEffect } from "react";
export default function page() {
  const { user } = useAuthContext();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Navbar></Navbar>
      <div className="animated-bg flex justify-center   text-center">
        <div className="md:w-[70%] w-[90%]">
          <h1 className="text-4xl md:text-6xl font-bold my-16 ">
            Welcome to MovieLand
          </h1>
          <p className="text-lg md:text-xl mb-6 animate-slide-in my-20  py-10">
            Filmix is your go-to destination for all things movies. Discover
            detailed information about your favorite films, including cast, plot
            summaries, trailers, and reviews. Stay updated with the latest
            releases, top picks, and timeless classics. Dive into the world of
            cinema with Filmix!
          </p>
          <div className="space-x-8  my-16">
            <Button className=" border-2 py-2 px-6">
              <Link href="/movies">Get started</Link>
            </Button>
            <Button className="  py-2 px-6">
              <Link href="/contactus">Contact us</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
