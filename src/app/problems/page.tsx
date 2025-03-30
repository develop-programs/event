"use client";
import React, { useState, useEffect } from "react";
import { allQuestions } from "../../data/questionBank";
import { Question, SelectedAnswers } from "../../types/interfaces";
import { useAtom } from "jotai";
import {
  roundTypeAtom,
  ToggleActiveRound,
  useRoundType,
} from "@/data/RoundsToggle";

export default function Problems() {
  // Function to get random questions based on wave ID
  const getRandomQuestions = (
    waveId: number,
    count: number = 5
  ): Question[] => {
    // Use waveId as seed for deterministic question selection
    // This ensures the same wave ID always gets the same questions
    const seed = waveId;
    const shuffled = [...allQuestions].sort((a, b) => {
      return ((seed * a.id) % 13) - ((seed * b.id) % 13);
    });
    return shuffled.slice(0, count);
  };

  const [roundTypes] = useAtom(roundTypeAtom);
  const { toggleActive } = ToggleActiveRound();
  const { getActiveRound, getActiveWaves } = useRoundType();

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds timer
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Find the Multiple-Choice round index
  const multipleChoiceRoundIndex = roundTypes.findIndex(
    (round) => round.type === "Multiple-Choice"
  );

  // Get active wave information
  const activeRound = getActiveRound();
  const activeWave =
    activeRound && activeRound.wave.find((wave) => wave.active);
  const activeWaveId = activeWave?.id || 1;

  // Get questions for the active wave
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (activeRound?.type === "Multiple-Choice" && activeWave) {
      setCurrentQuestions(getRandomQuestions(activeWave.id));
    }
  }, [activeWave?.id]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setShowResults(true); // Auto-submit when time expires
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft, timerActive]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle option selection
  const handleOptionSelect = (questionId: number, option: string): void => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  // Check results
  const handleSubmit = (): void => {
    setShowResults(true);
    setTimerActive(false);
  };

  // Change wave
  const changeWave = (waveIndex: number) => {
    toggleActive(multipleChoiceRoundIndex, waveIndex);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(60); // Reset timer to 60 seconds
    setTimerActive(true); // Start timer for new wave
  };

  // Toggle admin mode
  const toggleAdmin = (): void => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="w-full min-h-screen bg-white p-8">
      {/* Wave Tabs */}
      <div className="flex mb-6 border-b overflow-x-auto py-2">
        {multipleChoiceRoundIndex !== -1 &&
          roundTypes[multipleChoiceRoundIndex].wave.map((wave, waveIndex) => (
            <div key={wave.id} className="flex items-center">
              <button
                onClick={() => changeWave(waveIndex)}
                className={`px-4 py-2 mr-2 ${
                  wave.active ? "bg-blue-600 text-white" : "bg-gray-200"
                } rounded-t-lg flex items-center transition-colors`}
                disabled={showResults && !isAdmin}
                aria-pressed={wave.active}
                aria-label={`Select Wave ${wave.id}`}
              >
                Wave {wave.id}
                {wave.active && <span className="ml-2">•</span>}
              </button>
            </div>
          ))}
      </div>

      {/* Timer Display */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="font-medium">Time Remaining:</h2>
          <div
            className={`text-2xl font-bold ${
              timeLeft < 10 ? "text-red-600 animate-pulse" : ""
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {currentQuestions.map((q) => (
          <div key={q.id} className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-4">{q.question}</h2>

            <div
              className="space-y-2"
              role="radiogroup"
              aria-labelledby={`question-${q.id}`}
            >
              {q.options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={`q${q.id}-${option}`}
                    name={`question-${q.id}`}
                    value={option}
                    checked={selectedAnswers[q.id] === option}
                    onChange={() => handleOptionSelect(q.id, option)}
                    className="mr-2"
                    aria-checked={selectedAnswers[q.id] === option}
                    disabled={showResults || timeLeft === 0}
                  />
                  <label
                    htmlFor={`q${q.id}-${option}`}
                    className={`cursor-pointer ${
                      showResults || timeLeft === 0 ? "text-gray-500" : ""
                    }`}
                  >
                    {option}
                  </label>

                  {showResults && selectedAnswers[q.id] === option && (
                    <span
                      className={`ml-2 ${
                        option === q.correctAnswer
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      aria-live="polite"
                    >
                      {option === q.correctAnswer ? "✓" : "✗"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {showResults && (
              <div className="mt-3 text-sm" aria-live="polite">
                {selectedAnswers[q.id] === q.correctAnswer ? (
                  <p className="text-green-600">Correct!</p>
                ) : (
                  <p className="text-red-600">
                    Incorrect. The correct answer is: {q.correctAnswer}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className={`mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
          showResults || timeLeft === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Check your answers"
        disabled={showResults || timeLeft === 0}
      >
        {timeLeft === 0 ? "Time Expired" : "Check Answers"}
      </button>
    </div>
  );
}
