import { useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PredictionCard from "@/components/cards/PredictionCard";
import EmptyState from "@/components/common/EmptyState";
import { usePredictions } from "@/context/PredictionContext";
import { useAuth } from "@/context/AuthContext";

export default function Predictions() {
  const { predictionMatches, userPredictions, submitUserPrediction } = usePredictions();
  const { user } = useAuth();
  const [draft, setDraft] = useState<Record<string, string>>({});
  const enabled = useMemo(() => predictionMatches.filter((p) => p.enabled), [predictionMatches]);

  if (!user) return <MainLayout><EmptyState title="Login required" subtitle="Sign in to submit predictions." /></MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">Predictions</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {enabled.map((p) => {
          const existing = userPredictions.find((up) => up.predictionMatchId === p.id && up.userId === user.id);
          const selected = draft[p.id] || existing?.selectedOption;
          const canSubmit = p.status === "open" && new Date() <= new Date(p.deadline);
          return (
            <PredictionCard
              key={p.id}
              prediction={p}
              selected={selected}
              canSubmit={canSubmit}
              onSelect={(opt) => setDraft((prev) => ({ ...prev, [p.id]: opt }))}
              onSubmit={() => submitUserPrediction({ predictionMatchId: p.id, matchId: p.matchId, userId: user.id, userName: user.name, selectedOption: selected || "" })}
            />
          );
        })}
      </div>
    </MainLayout>
  );
}
