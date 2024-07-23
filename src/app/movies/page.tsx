"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import { SelectDemo } from "@/components/ui/categorySearch";
import Search from "@/components/ui/Search";
export default function page() {
  return (
    <>
      <Navbar></Navbar>
      <SelectDemo></SelectDemo>
      <Search></Search>
    </>
  );
}
