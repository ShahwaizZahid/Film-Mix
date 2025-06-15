"use client";

import Navbar from "@/components/ui/Navbar";
import { Mail, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ContactUsCard() {
  const handleContactClick = () => {
    // Opens Gmail compose with your email address
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=shahwaizmughal940@gmail.com&su=FilmMix%20Contact%20Request",
      "_blank"
    );
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground relative flex flex-col">
        <Navbar />

        {/* Decorative Bubbles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl animate-float-slow"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Sparkles className="absolute top-32 left-12 text-purple-400/30 w-8 h-8 animate-spin" />
          <Users className="absolute bottom-32 right-1/4 text-green-400/30 w-8 h-8 animate-bounce" />
        </div>

        <div className="flex flex-1 flex-col justify-center items-center mx-2 z-10">
          <div className="bg-white/80 dark:bg-black/70 p-8 rounded-2xl shadow-2xl max-w-lg mx-auto border-2 border-white/30 mt-16 backdrop-blur-md transition-all duration-500">
            <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              Contact Us
            </h2>
            <p className="mb-4 text-center text-muted-foreground">
              Have questions or feedback? We’d love to hear from you!
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-pink-400">
                How to Reach Us
              </h3>
              <p>
                Click the button below to send us an email via Gmail. Please
                include as much detail as possible so we can better assist you.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-pink-400">
                What to Include
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Your name</li>
                <li>Your contact information</li>
                <li>A detailed description of your inquiry or issue</li>
                <li>Any relevant screenshots or attachments</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleContactClick}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-6 rounded-md shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Mail size={20} />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
