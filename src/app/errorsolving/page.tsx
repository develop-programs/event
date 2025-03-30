"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import {
  errorProblems,
  errorAnswers,
  errorSubmitted,
  roundsAtom,
  currentRoundAtom,
  roundTimerAtom,
  isAdminAtom,
} from "@/data/errorproblems";
import Link from "next/link";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function ErrorSolving() {
  const [answers, setAnswers] = useAtom(errorAnswers);
  const [submitted, setSubmitted] = useAtom(errorSubmitted);
  const [isAdmin] = useAtom(isAdminAtom);
  const [problems] = useAtom(errorProblems);
  const [currentRound] = useAtom(currentRoundAtom);
  const [timer, setTimer] = useAtom(roundTimerAtom);
  const [rounds] = useAtom(roundsAtom);
  const [timeDisplay, setTimeDisplay] = useState("00:00");

  // Initialize or resume timer when round is active
  useEffect(() => {
    if (!currentRound) return;

    // If timer isn't running for current round, start it
    if (!timer.isRunning || !timer.endTime) {
      const now = Date.now();
      const endTime = now + currentRound.timeLimit * 60 * 1000;
      setTimer({
        endTime,
        timeRemaining: currentRound.timeLimit * 60, // in seconds
        isRunning: true,
      });
    }

    // Update timer every second
    const interval = setInterval(() => {
      if (timer.endTime) {
        const now = Date.now();
        const timeRemaining = Math.max(
          0,
          Math.floor((timer.endTime - now) / 1000)
        );

        if (timeRemaining <= 0) {
          clearInterval(interval);
          // Auto-submit when time runs out
          handleSubmit();
          setTimer({ ...timer, isRunning: false });
        } else {
          setTimer({ ...timer, timeRemaining });

          // Format time for display
          const minutes = Math.floor(timeRemaining / 60)
            .toString()
            .padStart(2, "0");
          const seconds = (timeRemaining % 60).toString().padStart(2, "0");
          setTimeDisplay(`${minutes}:${seconds}`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRound, timer.endTime]);

  const handleAnswerChange = (id: number, value: string | undefined) => {
    setAnswers({
      ...answers,
      [id]: value || "",
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    console.log("Submitted Answers:", answers);
  };

  // If no active round
  if (!currentRound) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          No Active Round
        </h1>
        <p className="mb-6 text-gray-600 text-center">
          There is no active round currently. Please check back later.
        </p>
        {isAdmin && (
          <Link
            href="/admin/rounds"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Manage Rounds
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:max-w-5xl">
        {/* Admin controls */}
        {isAdmin && (
          <div className="mt-4 mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-md">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Admin Controls
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/rounds"
                className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Manage Rounds
              </Link>
              <Link
                href="/admin/problems"
                className="px-4 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              >
                Edit Problems
              </Link>
            </div>
          </div>
        )}

        {/* Round header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 pt-4">
              {currentRound.name}
            </h1>
            <p className="text-gray-600">{currentRound.description}</p>
          </div>

          <div className="mt-4 sm:mt-0 bg-blue-100 px-6 py-3 rounded-md">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-mono text-xl font-bold text-blue-600">
                {timeDisplay}
              </span>
            </div>
            <div className="text-xs text-blue-600 mt-1">Time Remaining</div>
          </div>
        </div>

        <p className="mb-6 sm:mb-8 text-gray-600 text-center text-sm sm:text-base">
          Find and fix the bugs in these competitive coding problems. Your
          solutions will be evaluated afterward.
        </p>

        {problems.map((problem) => (
          <div
            key={problem.id}
            className="mb-8 sm:mb-12 p-4 sm:p-6 bg-white rounded-lg shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold">
                {problem.id}. {problem.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${
                  problem.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : problem.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {problem.difficulty}
              </span>
            </div>

            <div className="mb-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
              {problem.description}
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-sm sm:text-base">
                Language:{" "}
                <span className="text-blue-600">{problem.language}</span>
              </h3>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="font-medium mb-2 text-sm sm:text-base">
                Code with Bugs:
              </h3>
              <pre className="bg-gray-50 p-2 sm:p-4 rounded-md border border-gray-200 overflow-x-auto text-xs sm:text-sm">
                {problem.buggyCode}
              </pre>
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Your Solution:
              </label>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <MonacoEditor
                  height="400px"
                  defaultValue={answers[problem.id] || problem.buggyCode}
                  onChange={(value) => handleAnswerChange(problem.id, value)}
                  language={
                    problem.language === "C"
                      ? "c"
                      : problem.language === "C++"
                      ? "cpp"
                      : "python"
                  }
                  theme="light"
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    tabSize: 2,
                    automaticLayout: true,
                    wordWrap: "on",
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            Submit Solutions
          </button>
        </div>

        {submitted && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-100 text-green-700 rounded-md text-center text-sm sm:text-base">
            Your solutions have been submitted successfully! They will be
            evaluated shortly.
          </div>
        )}
      </div>
    </div>
  );
}
