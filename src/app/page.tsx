"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/custom/CountdownTimer";
import { Button } from "@/components/ui/button";

const LogoImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={200}
    height={200}
    loading="lazy"
    decoding="async"
    className={className}
  />
);

export default function page() {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/squid_games_3.mp3");

    // Configure audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;

      // Attempt to play audio automatically
      audioRef.current.play().catch((error) => {
        console.log("Auto-play failed:", error);
      });

      // Show content after brief loading period
      setTimeout(() => setIsLoading(false), 500);
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Show loading screen briefly while page initializes
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Eleminating</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-2 md:p-6">
      <div className="inset-0 w-full h-full rounded-lg bg-black/70 p-6">
        {/* Header Section */}
        <section aria-label="top-section">
          <div className="flex justify-between items-center">
            {/* Mobile Mumbai Indians Logo */}
            <LogoImage
              src="/269-2692179_mumbai-indians-logo-png.png"
              alt="Mumbai Indians logo"
              className="size-16 md:size-26 xl:size-32"
            />

            {/* Main Logo */}
            <LogoImage
              src="/logo.png"
              alt="Main logo"
              className="w-32 md:w-72 xl:w-100"
            />

            {/* Mobile Technica Logo */}
            <LogoImage
              src="/techinca_logo_clear.png"
              alt="Technica logo"
              className="w-[calc(100px/2)] md:w-24 xl:w-38"
            />
          </div>
        </section>

        {/* Main Content Section */}
        <section
          aria-label="main-section"
          className="h-[calc(100%-6rem)] md:h-[calc(100%-12rem)] py-4 min-[375px]:py-24 min-[412px]:py-28 lg:py-12 xl:py-12"
        >
          <div className="h-full text-white flex flex-col justify-between items-center">
            {/* Title and Subtitle */}
            <div className="text-center space-y-2">
              <h1
                className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-red-600 to-pink-500 
                  uppercase bg-clip-text text-transparent animate-gradient pb-2 drop-shadow-lg"
              >
                Intra University Coding Competition
              </h1>
              <p className="text-xl md:text-2xl font-medium text-blue-100 max-w-3xl mx-auto">
                Inspired by{" "}
                <span className="font-extrabold bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
                  Squid Game
                </span>{" "}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="w-full my-4 md:my-8 flex-grow flex items-center justify-center">
              <CountdownTimer targetDate="2025-04-2 10:00:00" />
            </div>

            {/* Organizer Information */}
            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 
                text-center w-full max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-bold">2 April 2025</h2>
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

            {/* Mobile Action Buttons */}
            <div className="flex items-center justify-center w-full max-w-md mx-auto mt-2 lg:mt-6">
              <Button
                className="bg-gradient-to-r from-pink-700 to-red-600 hover:from-pink-800 hover:to-red-700 
                text-lg font-bold px-8 py-3 border border-white/20 shadow-lg shadow-pink-700/30 
                transition-all hover:scale-105 hover:duration-500 ease-in-out hover:shadow-pink-600/50"
                asChild
              >
                <Link
                  href="https://forms.gle/MKRZEvvS75awVQCr8"
                  className="flex items-center gap-2"
                >
                  Register Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulse"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </Button>
              {/* <Login className="md:hidden" /> */}
            </div>
          </div>
        </section>

        {/* <section aria-label="bottom-section">
          <div className="h-full flex justify-center items-center">
            <LogoImage
              src="/image-1.png"
              alt="Center logo"
              className="w-28 md:w-42"
            />
          </div>
        </section> */}
      </div>
    </div>
  );
}
