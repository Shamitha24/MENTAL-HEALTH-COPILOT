
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface JournalPromptProps {
  prompt: string;
  onSave: (entry: string) => void;
  className?: string;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({ prompt, onSave, className }) => {
  const [entry, setEntry] = useState("");
  
  const handleSave = () => {
    if (entry.trim()) {
      onSave(entry);
      setEntry("");
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-mental-tertiary">Journal Entry</CardTitle>
        <CardDescription>Take a moment to reflect...</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium mb-3 text-mental-secondary italic">"{prompt}"</p>
        <Textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Start writing here..."
          className="min-h-[150px] mental-input"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={!entry.trim()} className="mental-button">
          Save Entry
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalPrompt;
