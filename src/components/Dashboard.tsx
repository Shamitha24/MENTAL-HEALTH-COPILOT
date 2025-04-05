
import React from "react";
import MoodTracker from "./MoodTracker";
import MoodChart from "./MoodChart";
import JournalPrompt from "./JournalPrompt";
import ChatInterface from "./ChatInterface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

// Mock data for mood history
const mockMoodData = [
  { date: "Mon", value: 3, mood: "neutral" as MoodType },
  { date: "Tue", value: 2, mood: "bad" as MoodType },
  { date: "Wed", value: 4, mood: "good" as MoodType },
  { date: "Thu", value: 5, mood: "great" as MoodType },
  { date: "Fri", value: 4, mood: "good" as MoodType },
  { date: "Sat", value: 3, mood: "neutral" as MoodType },
  { date: "Sun", value: 4, mood: "good" as MoodType }
];

// Journal prompts
const journalPrompts = [
  "What are three things you're grateful for today?",
  "What's something that made you smile today?",
  "What's one thing you're looking forward to tomorrow?",
  "Describe a challenge you faced today and how you handled it.",
  "What's something new you learned about yourself recently?",
  "What boundaries do you need to set or maintain for your mental wellbeing?",
  "Describe a moment when you felt at peace today."
];

const Dashboard: React.FC = () => {
  // State for mood data
  const [moodData, setMoodData] = React.useState(mockMoodData);
  
  // Randomly select a journal prompt
  const [prompt, setPrompt] = React.useState(
    journalPrompts[Math.floor(Math.random() * journalPrompts.length)]
  );
  
  // Handle mood submission
  const handleMoodSubmit = (mood: MoodType, notes: string) => {
    // Get today's day name
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    
    // Update mood data
    setMoodData(prev => {
      // Create new array without changing the original
      const newData = [...prev];
      // Find if today already exists
      const todayIndex = newData.findIndex(item => item.date === today);
      
      if (todayIndex >= 0) {
        // Update existing entry
        newData[todayIndex] = { 
          date: today, 
          value: getMoodValue(mood), 
          mood 
        };
      } else {
        // Add new entry
        newData.push({ 
          date: today, 
          value: getMoodValue(mood), 
          mood 
        });
      }
      
      return newData;
    });
    
    toast.success("Mood tracked successfully!");
  };
  
  // Get numerical value for mood
  const getMoodValue = (mood: MoodType): number => {
    switch (mood) {
      case "terrible": return 1;
      case "bad": return 2;
      case "neutral": return 3;
      case "good": return 4;
      case "great": return 5;
      default: return 3;
    }
  };
  
  // Handle journal entry submission
  const handleJournalSave = (entry: string) => {
    console.log("Journal entry saved:", entry);
    // In a real app, we would save this to a database
    toast.success("Journal entry saved!");
    
    // Set a new random prompt
    setPrompt(journalPrompts[Math.floor(Math.random() * journalPrompts.length)]);
  };
  
  return (
    <div className="container px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-mental-tertiary">Mental Health Copilot</h1>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-mental-light">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-mental-primary data-[state=active]:text-white">Dashboard</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-mental-primary data-[state=active]:text-white">Chat</TabsTrigger>
          <TabsTrigger value="journal" className="data-[state=active]:bg-mental-primary data-[state=active]:text-white">Journal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MoodTracker onSubmit={handleMoodSubmit} />
            <MoodChart data={moodData} />
          </div>
        </TabsContent>
        
        <TabsContent value="chat" className="animate-fade-in">
          <ChatInterface />
        </TabsContent>
        
        <TabsContent value="journal" className="animate-fade-in">
          <JournalPrompt prompt={prompt} onSave={handleJournalSave} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
