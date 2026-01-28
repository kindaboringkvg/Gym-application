// components/WorkoutCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

// 1. Define what a single "Set" looks like
interface WorkoutSet {
  weight: number;
  reps: number;
}

// 2. Define the props the component expects
interface WorkoutCardProps {
  exercise: string;
  sets: WorkoutSet[];
}

export default function WorkoutCard({ exercise, sets }: WorkoutCardProps) {
  return (
    <Card className="bg-zinc-950 border-zinc-800 hover:border-red-500 transition-all cursor-pointer group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {exercise}
        </CardTitle>
        <Badge variant="outline" className="text-red-500 border-red-500/50 bg-red-500/10">
          {sets.length} SETS
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sets.slice(0, 3).map((set, i) => (
            <div key={i} className="flex justify-between text-zinc-400 text-sm font-medium">
              <span>SET {i + 1}</span>
              <span className="text-white">
                {/* Weight and reps now have proper types */}
                {set.weight}kg × {set.reps}
              </span>
            </div>
          ))}
          {sets.length > 3 && (
            <div className="text-zinc-600 text-xs italic mt-2">
              +{sets.length - 3} more sets
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center group-hover:text-red-500 transition-colors">
          <span className="text-xs font-bold uppercase tracking-widest">View Analysis</span>
          <ChevronRight size={16} />
        </div>
      </CardContent>
    </Card>
  );
}