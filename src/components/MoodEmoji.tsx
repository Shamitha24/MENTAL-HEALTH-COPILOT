
import React from "react";
import { cn } from "@/lib/utils";

type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

interface MoodEmojiProps {
  mood: MoodType;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const emojis: Record<MoodType, string> = {
  great: "😃",
  good: "🙂",
  neutral: "😐",
  bad: "😔",
  terrible: "😢"
};

const MoodEmoji: React.FC<MoodEmojiProps> = ({ 
  mood, 
  size = "md", 
  selected = false,
  onClick,
  className
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl"
  };

  return (
    <button
      className={cn(
        "rounded-full p-2 transition-all duration-300",
        selected ? "bg-mental-primary/20 scale-110" : "hover:bg-mental-light",
        onClick ? "cursor-pointer" : "cursor-default",
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      type="button"
    >
      {emojis[mood]}
    </button>
  );
};

export default MoodEmoji;
