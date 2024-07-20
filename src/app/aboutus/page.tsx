import React from "react";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

const AboutUs = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="p-6 max-w-4xl mx-auto my-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold ">About Us</h1>
        </header>
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold ">Welcome to Filmix!</h2>
          <p className="text-lg ">
            At Filmix, our mission is to bring movie enthusiasts closer to the
            films they love. We are passionate about creating a platform where
            movie lovers can discover, filter, and enjoy their favorite films
            with ease. Our team is dedicated to ensuring that every user has
            access to an exceptional movie experience.
          </p>

          <h2 className="text-3xl font-semibold ">Our Story</h2>
          <p className="text-lg ">
            Filmix was founded with the vision of providing a unique and
            personalized movie exploration experience. Our platform combines
            advanced movie filtering technology with a secure authentication
            system, ensuring that our users have a seamless and engaging
            interaction with their favorite films. Whether you're a casual
            viewer or a dedicated cinephile, Filmix is designed to cater to your
            movie-watching needs.
          </p>

          <h2 className="text-3xl font-semibold ">What We Offer</h2>
          <ul className="list-disc list-inside space-y-3 text-lg ">
            <li>
              <strong>Exclusive Access:</strong> Our authentication system
              ensures that only authorized users can access detailed movie
              information, giving you a curated and secure viewing experience.
            </li>
            <li>
              <strong>Advanced Filtering:</strong> Find the perfect movie with
              our sophisticated filter options. Customize your search based on
              genres, ratings, and more to discover films that match your
              tastes.
            </li>
            <li>
              <strong>Contact Us:</strong> Have questions or feedback? Our
              Contact Us page is available for all inquiries. We're here to help
              and ensure you have the best experience on Filmix.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold ">Join Us</h2>
          <p className="text-lg ">
            Become part of the Filmix community and elevate your movie-watching
            experience. Sign up today and start exploring our extensive movie
            database with tailored recommendations just for you.
          </p>

          <p className="text-lg ">
            Thank you for choosing Filmix. We look forward to being your go-to
            movie platform!
          </p>

          <h2 className="text-3xl font-semibold ">Contact Us</h2>
          <p className="text-lg ">
            For any questions or feedback, please visit our{" "}
            <Link href="/contactus" className="text-blue-500 hover:underline">
              Contact Us
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
