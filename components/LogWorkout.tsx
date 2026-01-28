// components/LogWorkout.tsx
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export function LogWorkout() {
  const [sets, setSets] = useState([{ weight: "", reps: "" }]);

  const addSet = () => setSets([...sets, { weight: "", reps: "" }]);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-8">
        LOG <span className="text-red-600">SESSION</span>
      </h1>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Exercise Name</label>
          <Input 
            placeholder="e.g. BENCH PRESS" 
            className="bg-zinc-900 border-none text-2xl h-16 font-bold focus-visible:ring-red-600"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sets & Reps</label>
          </div>
          
          {sets.map((set, index) => (
            <div key={index} className="flex gap-4 items-center animate-in slide-in-from-left-4">
              <div className="flex-1 bg-zinc-900 p-4 rounded-xl flex items-center justify-between">
                <span className="text-zinc-500 font-bold">{index + 1}</span>
                <div className="flex gap-4">
                  <input placeholder="KG" className="bg-transparent w-12 text-center font-bold text-xl outline-none" />
                  <span className="text-zinc-700">/</span>
                  <input placeholder="REPS" className="bg-transparent w-12 text-center font-bold text-xl outline-none" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={addSet}
          variant="outline" 
          className="w-full h-14 border-dashed border-zinc-700 text-zinc-400 hover:bg-zinc-900"
        >
          <Plus className="mr-2" /> ADD SET
        </Button>

        <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black text-xl italic uppercase">
          FINISH WORKOUT
        </Button>
      </div>
    </div>
  );
}