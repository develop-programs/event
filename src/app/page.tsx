import CountdownTimer from "@/components/custom/CountdownTimer";
import Login from "@/components/custom/Login";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="h-full p-2 md:p-6">
      <div className="inset-0 w-full h-full rounded-lg bg-black/70 space-y-6 p-6">
        <section aria-label="top-section" className="row-span-2">
          <div className="flex justify-between">
            <Image
              src="/269-2692179_mumbai-indians-logo-png-removebg-preview.png"
              alt="logo"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="size-14 md:size-32 invert md:hidden"
            />
            <Button className="hidden md:block" asChild>
              <Link href="https://forms.gle/MKRZEvvS75awVQCr8">
                Register Now
              </Link>
            </Button>
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="w-32 md:w-100"
            />
            <Login className="hidden md:flex" />
            <Image
              src="/techinca_logo_clear.png"
              alt="logo"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="w-[calc(200px/2)] md:w-38 md:hidden"
            />
          </div>
        </section>
        <section aria-label="main-section" className="row-span-4">
          <div className="h-full flex flex-col items-center justify-between space-y-4 lg:space-y-8 text-white py-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-red-600 to-pink-500 uppercase bg-clip-text text-transparent animate-gradient pb-2 drop-shadow-lg">
                Intra University Coding Competition
              </h1>
              <p className="text-xl md:text-2xl font-medium text-blue-100 max-w-3xl mx-auto">
                Inspired by{" "}
                <span className="font-extrabold bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
                  Squid Game
                </span>{" "}
                - Survive the challenges
              </p>
            </div>

            <div className="my-4 md:my-8 flex-grow flex items-center">
              <CountdownTimer targetDate="2025-03-29 10:00:00" />
            </div>

            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center w-full max-w-2xl">
              <h2 className="text-md md:text-2xl font-semibold mb-4">
                Organized by:
              </h2>
              <div className="flex flex-col space-y-2 text-sm md:text-xl">
                <p className="font-medium">
                  Club Technica (MCA 2<sup>nd</sup> SEM) and SER
                </p>
                <p className="text-xs md:text-lg font-medium text-blue-300">
                  ITM University Raipur
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full max-w-2xl">
              <Button className="md:hidden" asChild>
                <Link href="https://forms.gle/MKRZEvvS75awVQCr8">
                  Register Now
                </Link>
              </Button>
              <Login className="md:hidden" />
            </div>
          </div>
        </section>
        <section aria-label="bottom-section" className="row-span-2">
          <div className="h-full flex lg:justify-between justify-center items-center">
            <Image
              src="/269-2692179_mumbai-indians-logo-png-removebg-preview.png"
              alt="logo"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="size-14 md:size-32 invert hidden md:block"
            />
            <Image
              src="/image-1.png"
              alt="logo"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="w-28 md:w-42"
            />
            <Image
              src="/techinca_logo_clear.png"
              alt="logo"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="w-[calc(150px/2)] md:w-38 hidden md:block"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
