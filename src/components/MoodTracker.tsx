
import React, { useState } from "react";
import MoodEmoji from "./MoodEmoji";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

interface MoodTrackerProps {
  onSubmit: (mood: MoodType, notes: string) => void;
  className?: string;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onSubmit, className }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood, notes);
      setSelectedMood(null);
      setNotes("");
    }
  };

  return (
    <div className={className}>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-mental-light">
        <h3 className="text-xl font-semibold mb-4 text-mental-tertiary">How are you feeling today?</h3>
        
        <div className="flex justify-between mb-6">
          {(["great", "good", "neutral", "bad", "terrible"] as MoodType[]).map(mood => (
            <MoodEmoji
              key={mood}
              mood={mood}
              selected={selectedMood === mood}
              onClick={() => setSelectedMood(mood)}
            />
          ))}
        </div>
        
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add some notes about your mood (optional)"
          className="mb-4 resize-none h-24 mental-input"
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="w-full mental-button"
        >
          Save Mood
        </Button>
      </div>
    </div>
  );
};

export default MoodTracker;
