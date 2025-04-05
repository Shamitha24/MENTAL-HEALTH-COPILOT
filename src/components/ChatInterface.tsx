
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import { SendIcon } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  className?: string;
}

const mockGeminiResponse = async (message: string): Promise<string> => {
  // Simulate API response delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple responses based on keywords
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    return "Hello! I'm your mental health assistant. How are you feeling today?";
  }
  if (message.toLowerCase().includes("sad") || message.toLowerCase().includes("depress")) {
    return "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way, and these feelings are temporary. Would you like to talk more about what's troubling you, or would you prefer some suggestions for gentle activities that might help lift your mood?";
  }
  if (message.toLowerCase().includes("anxious") || message.toLowerCase().includes("stress")) {
    return "It sounds like you're experiencing some anxiety. Let's take a moment to breathe together. Inhale slowly for 4 counts, hold for 4, and exhale for 6. Would it help to discuss what's causing these feelings of anxiety?";
  }
  if (message.toLowerCase().includes("happy") || message.toLowerCase().includes("good")) {
    return "I'm glad to hear you're feeling positive! It's wonderful to acknowledge these good moments. What has contributed to your good mood today?";
  }
  
  // Default response
  return "I'm here to support you. Would you like to share more about how you're feeling, or perhaps try a brief mindfulness exercise together?";
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm your mental health companion powered by Google Gemini. How are you feeling today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await mockGeminiResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-mental-tertiary">Chat with your Mental Health Copilot</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] overflow-y-auto p-4">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-mental-secondary ml-12 mb-4">
              <div className="w-2 h-2 rounded-full bg-mental-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-mental-primary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-mental-primary animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-mental-light">
          <form 
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="mental-input"
              disabled={isLoading}
            />
            <Button 
              className="mental-button"
              disabled={!input.trim() || isLoading} 
              type="submit"
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
