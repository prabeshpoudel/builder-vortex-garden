import { PredictionMatch, UserPrediction } from "@/types/scoreguff";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/forms/Button";

export default function PredictionCard({
  prediction,
  selected,
  onSelect,
  onSubmit,
  canSubmit,
}: {
  prediction: PredictionMatch;
  selected?: string;
  onSelect: (option: string) => void;
  onSubmit: () => void;
  canSubmit: boolean;
}) {
  const deadline = new Date(prediction.deadline);
  const timeLeft = deadline.getTime() - Date.now();
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={prediction.leagueLogo} className="h-8 w-8 rounded-full object-cover" />
          <span className="font-semibold">{prediction.leagueName}</span>
        </div>
        <StatusBadge status={prediction.status} />
      </div>
      <div className="my-4 flex items-center justify-between">
        <div className="text-center"><img src={prediction.team1Logo} className="mx-auto h-12 w-12 rounded-full object-cover" /><p className="font-bold">{prediction.team1Name}</p></div>
        <span className="text-slate-400">VS</span>
        <div className="text-center"><img src={prediction.team2Logo} className="mx-auto h-12 w-12 rounded-full object-cover" /><p className="font-bold">{prediction.team2Name}</p></div>
      </div>
      <p className="text-sm text-slate-600">Match: {new Date(prediction.matchDateTime).toLocaleString()}</p>
      <p className="text-sm text-slate-600">Deadline: {deadline.toLocaleString()} ({timeLeft > 0 ? `${Math.floor(timeLeft / 3600000)}h left` : "Closed"})</p>
      <div className="mt-4 grid gap-2">
        {prediction.options.map((option) => (
          <button key={option} onClick={() => onSelect(option)} className={`rounded-lg border px-3 py-2 text-left ${selected === option ? "border-blue-600 bg-blue-50" : "hover:bg-slate-50"}`}>
            {option}
          </button>
        ))}
      </div>
      <Button className="mt-3 w-full" disabled={!canSubmit || !selected} onClick={onSubmit}>Submit Prediction</Button>
      {selected && <p className="mt-2 text-sm text-blue-700">Selected: {selected}</p>}
      {prediction.correctResult && <p className="mt-1 text-sm font-semibold text-emerald-600">Result: {prediction.correctResult}</p>}
    </div>
  );
}
