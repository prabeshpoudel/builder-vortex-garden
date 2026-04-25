import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedPredictionMatches } from "@/data/seed";
import { PredictionMatch, UserPrediction } from "@/types/scoreguff";
import { loadFromStorage, saveToStorage, uid } from "@/utils/storage";

interface PredictionContextValue {
  predictionMatches: PredictionMatch[];
  userPredictions: UserPrediction[];
  addPredictionMatch: (payload: Omit<PredictionMatch, "id">) => void;
  updatePredictionMatch: (id: string, payload: Partial<PredictionMatch>) => void;
  deletePredictionMatch: (id: string) => void;
  submitUserPrediction: (payload: Omit<UserPrediction, "id" | "submittedAt" | "isCorrect">) => { ok: boolean; error?: string };
  clearPredictions: () => void;
}

const PRED_KEY = "scoreguff_prediction_matches";
const USER_PRED_KEY = "scoreguff_user_predictions";
const PredictionContext = createContext<PredictionContextValue | undefined>(undefined);

export const PredictionProvider = ({ children }: { children: React.ReactNode }) => {
  const [predictionMatches, setPredictionMatches] = useState<PredictionMatch[]>([]);
  const [userPredictions, setUserPredictions] = useState<UserPrediction[]>([]);

  useEffect(() => {
    setPredictionMatches(loadFromStorage(PRED_KEY, seedPredictionMatches));
    setUserPredictions(loadFromStorage(USER_PRED_KEY, []));
  }, []);

  useEffect(() => {
    if (predictionMatches.length) saveToStorage(PRED_KEY, predictionMatches);
  }, [predictionMatches]);

  useEffect(() => {
    saveToStorage(USER_PRED_KEY, userPredictions);
  }, [userPredictions]);

  const addPredictionMatch = (payload: Omit<PredictionMatch, "id">) => {
    setPredictionMatches((prev) => [...prev, { ...payload, id: uid("p") }]);
  };

  const updatePredictionMatch = (id: string, payload: Partial<PredictionMatch>) => {
    setPredictionMatches((prev) => prev.map((p) => (p.id === id ? { ...p, ...payload } : p)));
    if (payload.status === "completed" && payload.correctResult) {
      setUserPredictions((prev) =>
        prev.map((up) =>
          up.predictionMatchId === id
            ? { ...up, isCorrect: up.selectedOption === payload.correctResult }
            : up,
        ),
      );
    }
  };

  const deletePredictionMatch = (id: string) => {
    setPredictionMatches((prev) => prev.filter((p) => p.id !== id));
    setUserPredictions((prev) => prev.filter((p) => p.predictionMatchId !== id));
  };

  const submitUserPrediction: PredictionContextValue["submitUserPrediction"] = (payload) => {
    const prediction = predictionMatches.find((p) => p.id === payload.predictionMatchId);
    if (!prediction || !prediction.enabled) return { ok: false, error: "Prediction unavailable" };
    const now = new Date();
    if (prediction.status !== "open" || now > new Date(prediction.deadline)) {
      return { ok: false, error: "Prediction is closed" };
    }

    setUserPredictions((prev) => {
      const existing = prev.find(
        (p) => p.predictionMatchId === payload.predictionMatchId && p.userId === payload.userId,
      );
      if (existing) {
        return prev.map((p) =>
          p.id === existing.id
            ? { ...p, selectedOption: payload.selectedOption, submittedAt: new Date().toISOString() }
            : p,
        );
      }
      return [...prev, { ...payload, id: uid("up"), submittedAt: new Date().toISOString() }];
    });

    return { ok: true };
  };

  const clearPredictions = () => setUserPredictions([]);

  const value = useMemo(
    () => ({
      predictionMatches,
      userPredictions,
      addPredictionMatch,
      updatePredictionMatch,
      deletePredictionMatch,
      submitUserPrediction,
      clearPredictions,
    }),
    [predictionMatches, userPredictions],
  );

  return <PredictionContext.Provider value={value}>{children}</PredictionContext.Provider>;
};

export const usePredictions = () => {
  const ctx = useContext(PredictionContext);
  if (!ctx) throw new Error("usePredictions must be used inside PredictionProvider");
  return ctx;
};
