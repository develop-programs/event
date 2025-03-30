"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { roundsAtom, isAdminAtom } from "@/data/errorproblems";
import {
  roundTypeAtom,
  ToggleActiveRound,
  useRoundType,
  useCreateNewWave,
  useRemoveWave,
} from "@/data/RoundsToggle";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ManageRounds() {
  const [roundTypes, setRoundTypes] = useAtom(roundTypeAtom);
  const [isAdmin] = useAtom(isAdminAtom);
  const { toggleActive } = ToggleActiveRound();
  const router = useRouter();

  // Check if user is admin, redirect if not
  if (!isAdmin) {
    router.push("/admin/login");
    return null;
  }

  const handleToggleWave = (roundIndex: number, waveIndex: number) => {
    toggleActive(roundIndex, waveIndex);
  };

  const handleSetPoints = (
    roundIndex: number,
    waveIndex: number,
    points: number
  ) => {
    setRoundTypes((prev) => {
      const newRoundTypes = [...prev];
      newRoundTypes[roundIndex].wave[waveIndex].points = points;

      // Update total points
      newRoundTypes[roundIndex].totalPoints = newRoundTypes[
        roundIndex
      ].wave.reduce((total, wave) => total + wave.points, 0);

      return newRoundTypes;
    });
  };

  const handleAddNewWave = (roundIndex: number, type: string) => {
    if (type === roundTypes[roundIndex].type) {
      const newWave = {
        id: roundTypes[roundIndex].wave.length + 1,
        active: false,
        points: 0,
      };
      setRoundTypes((prev) => {
        const newRoundTypes = [...prev];
        newRoundTypes[roundIndex].wave.push(newWave);
        newRoundTypes[roundIndex].totalPoints += newWave.points;
        return newRoundTypes;
      });
      return;
    }
  };

  const handleRemoveWave = (
    roundIndex: number,
    waveIndex: number,
    type: string
  ) => {
    if (type === roundTypes[roundIndex].type) {
      setRoundTypes((prev) => {
        const newRoundTypes = [...prev];
        const waveToRemove = newRoundTypes[roundIndex].wave[waveIndex];

        // Remove the wave and update total points
        newRoundTypes[roundIndex].wave.splice(waveIndex, 1);
        newRoundTypes[roundIndex].totalPoints -= waveToRemove.points;

        return newRoundTypes;
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Rounds</h1>
        </div>

        {/* Round Types Management Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium">Round Types</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage round waves and points
            </p>
          </div>

          <div className="border-t border-gray-200">
            {roundTypes.map((roundType, roundIndex) => (
              <div
                key={roundType.type}
                className="px-4 py-5 sm:p-6 border-b border-gray-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-md font-medium">{roundType.type}</h3>
                  <button
                    onClick={() => handleAddNewWave(roundIndex, roundType.type)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Wave
                  </button>
                </div>

                <div className="mt-3 space-y-3">
                  {roundType.wave.map((wave, waveIndex) => (
                    <div
                      key={wave.id}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleToggleWave(roundIndex, waveIndex)
                          }
                          className={`mr-3 px-3 py-1 text-sm font-medium rounded-md ${
                            wave.active
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-gray-100 text-gray-800 border border-gray-300"
                          }`}
                        >
                          Wave {wave.id}{" "}
                          {wave.active ? "(Active)" : "(Inactive)"}
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            handleRemoveWave(
                              roundIndex,
                              waveIndex,
                              roundType.type
                            )
                          }
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50"
                          title="Remove Wave"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
