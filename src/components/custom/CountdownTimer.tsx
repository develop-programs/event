"use client";
import React, { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  targetDate: string; // Format: "YYYY-MM-DD HH:MM:SS" or ISO string
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    try {
      // Ensure target date is valid
      const targetTime = new Date(targetDate).getTime();

      if (isNaN(targetTime)) {
        console.error("Invalid target date provided:", targetDate);
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      const now = new Date().getTime();
      const difference = targetTime - now;

      // Check if countdown is expired
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      // Calculate time units
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    } catch (error) {
      console.error("Error calculating time left:", error);
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    // Reset timer when target date changes
    setTimeLeft(calculateTimeLeft());

    // Don't start the timer if already expired
    if (timeLeft.isExpired) return;

    let animationFrameId: number;
    let lastUpdateTime = Date.now();

    // Update function using requestAnimationFrame for smoother updates
    const updateTimer = () => {
      const now = Date.now();

      // Only update the state if at least 1 second has passed
      if (now - lastUpdateTime >= 1000) {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);
        lastUpdateTime = now;

        // Stop the timer when it expires
        if (newTimeLeft.isExpired) return;
      }

      animationFrameId = requestAnimationFrame(updateTimer);
    };

    animationFrameId = requestAnimationFrame(updateTimer);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetDate, calculateTimeLeft]);

  return (
    <div className="flex justify-center space-x-4 md:space-x-6">
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-xs md:text-sm uppercase tracking-wider text-gray-400 mt-1">
          Days
        </div>
      </div>
      <div className="flex items-center text-2xl md:text-4xl text-gray-300 pb-6">
        :
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs md:text-sm uppercase tracking-wider text-gray-400 mt-1">
          Hours
        </div>
      </div>
      <div className="flex items-center text-2xl md:text-4xl text-gray-300 pb-6">
        :
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs md:text-sm uppercase tracking-wider text-gray-400 mt-1">
          Minutes
        </div>
      </div>
      <div className="flex items-center text-2xl md:text-4xl text-gray-300 pb-6">
        :
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs md:text-sm uppercase tracking-wider text-gray-400 mt-1">
          Seconds
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
