// components/AiInsights.tsx
export function AiInsights() {
  return (
    <div className="rounded-3xl border border-red-900/30 bg-gradient-to-br from-zinc-950 to-red-950/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
        <h3 className="font-bold text-red-500 uppercase tracking-widest text-sm">AI Analysis</h3>
      </div>
      <p className="text-zinc-300 leading-relaxed italic">
        "Your Bench Press intensity dropped by <span className="text-white font-bold">15%</span> on Set 5. Consider increasing rest time to 120s for maximum hypertrophy."
      </p>
    </div>
  );
}