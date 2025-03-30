import { atom, useAtom } from "jotai";

/**
 * Defines the structure for rounds and waves in the event.
 * Each round has a type and contains multiple waves.
 * Each wave has an ID, active status, and points.
 */
type RoundType = {
  type: string; // Type of the round (e.g., "Multiple-Choice")
  wave: {
    id: number; // Unique identifier for the wave
    active: boolean; // Whether the wave is currently active
    points: number; // Points earned in the wave
  }[];
  totalPoints: number; // Total points across all waves in the round
}[];

export const roundTypeAtom = atom<RoundType>([
  {
    type: "Multiple-Choice",
    wave: [
      { id: 1, active: true, points: 0 },
      { id: 2, active: false, points: 0 },
      { id: 3, active: false, points: 0 },
    ],
    totalPoints: 0,
  },
]);

export function ToggleActiveRound() {
  const [roundType, setRoundType] = useAtom(roundTypeAtom);

  const toggleActive = (roundIndex: number, waveIndex: number) => {
    setRoundType((prev) => {
      const newRoundType = [...prev];
      const currentWave = newRoundType[roundIndex].wave[waveIndex];

      // If the wave is already active, just deactivate it
      if (currentWave.active) {
        currentWave.active = false;
      } else {
        // Deactivate all waves in this round
        newRoundType[roundIndex].wave.forEach((wave) => {
          wave.active = false;
        });

        // Activate only the selected wave
        currentWave.active = true;
      }

      return newRoundType;
    });
  };

  return { roundType, toggleActive };
}

export function useRoundType() {
  const [roundType] = useAtom(roundTypeAtom);
  const getActiveRound = () => {
    return roundType.find((round) => round.wave.some((wave) => wave.active));
  };

  const getActiveWaves = (roundIndex: number) => {
    return roundType[roundIndex].wave.filter((wave) => wave.active);
  };

  return { getActiveRound, getActiveWaves };
}

export function setPoints(
  roundIndex: number,
  waveIndex: number,
  points: number
) {
  const [roundType, setRoundType] = useAtom(roundTypeAtom);
  setRoundType((prev) => {
    const newRoundType = [...prev];
    newRoundType[roundIndex].wave[waveIndex].points = points;
    return newRoundType;
  });
}

export function getTotalPoints(roundIndex: number) {
  const [roundType] = useAtom(roundTypeAtom);
  return roundType[roundIndex].wave.reduce(
    (total, wave) => total + wave.points,
    0
  );
}

export function useCreateNewWave() {
  const [roundType, setRoundType] = useAtom(roundTypeAtom);

  const createNewWave = (roundIndex: number) => {
    setRoundType((prev) => {
      const newRoundType = [...prev];
      const newWaveId = newRoundType[roundIndex].wave.length + 1;
      newRoundType[roundIndex].wave.push({
        id: newWaveId,
        active: false,
        points: 0,
      });
      return newRoundType;
    });
  };

  return createNewWave;
}

export function useRemoveWave() {
  const [roundType, setRoundType] = useAtom(roundTypeAtom);

  const removeWave = (roundIndex: number, waveIndex: number) => {
    setRoundType((prev) => {
      const newRoundType = [...prev];

      // Remove the wave
      newRoundType[roundIndex].wave.splice(waveIndex, 1);

      // Renumber the remaining waves to maintain sequential IDs
      newRoundType[roundIndex].wave.forEach((wave, idx) => {
        wave.id = idx + 1;
      });

      // Recalculate total points
      newRoundType[roundIndex].totalPoints = newRoundType[
        roundIndex
      ].wave.reduce((total, wave) => total + wave.points, 0);

      return newRoundType;
    });
  };

  return removeWave;
}
