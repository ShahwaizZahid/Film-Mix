"use client";

import Navbar from "@/components/ui/Navbar";

export default function ContactUsCard() {
  const handleContactClick = () => {
    const gmailComposeUrl = `shahwaizmughal940@gmail.com`;
    window.open(gmailComposeUrl, "_blank");
  };

  return (
    <>
      <div className="min-h-screen ">
        <Navbar></Navbar>
        <div className="flex flex-col justify-center items-center  mx-2">
          <div className="  p-8 rounded-md shadow-md max-w-lg mx-auto border-2 border-white mt-10">
            <h2 className="text-3xl font-bold mb-4 text-center dark:text-white">
              Contact Us
            </h2>
            <p className="mb-4 text-center dark:text-white">
              If you have any questions, feel free to reach out to us!
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                How to Contact Us
              </h3>
              <p className="dark:text-white">
                Click the button below to send us an email via Gmail. We
                appreciate your feedback and inquiries about our website. Please
                include as much detail as possible so we can better assist you.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                What to Include in Your Email
              </h3>
              <p className="dark:text-white">
                When sending an email, please include:
              </p>
              <ul className="list-disc list-inside dark:text-white">
                <li>Your name</li>
                <li>Your contact information</li>
                <li>A detailed description of your inquiry or issue</li>
                <li>Any relevant screenshots or attachments</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleContactClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
