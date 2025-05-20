
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div 
      ref={messageRef}
      className={cn(
        "chat-message mb-4 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex items-start">
        {!isUser && (
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skymark to-skymark-light flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">S</span>
          </div>
        )}
        
        <div className={cn(
          "chat-bubble",
          isUser ? "user-bubble" : "bot-bubble"
        )}>
          {content}
        </div>
        
        {isUser && (
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center ml-2">
            <span className="text-white text-sm">You</span>
          </div>
        )}
      </div>
      <div 
        className={cn(
          "text-xs text-gray-500 mt-1",
          isUser ? "text-right mr-10" : "ml-10"
        )}
      >
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ChatMessage;
