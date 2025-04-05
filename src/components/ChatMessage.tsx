
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser,
  timestamp 
}) => {
  return (
    <div className={cn(
      "flex items-start gap-3 mb-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className={cn(
        "w-10 h-10",
        isUser ? "bg-mental-primary" : "bg-mental-secondary"
      )}>
        <span className="text-sm">{isUser ? "You" : "AI"}</span>
      </Avatar>
      
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl p-4",
          isUser 
            ? "bg-mental-primary text-white rounded-tr-none" 
            : "bg-mental-light text-mental-dark rounded-tl-none"
        )}
      >
        <p className="whitespace-pre-wrap">{message}</p>
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-white/70" : "text-mental-dark/70"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
