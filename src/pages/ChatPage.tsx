
import { useState, useEffect, useRef } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import ChatMessage from '@/components/Chat/ChatMessage';
import ChatInput from '@/components/Chat/ChatInput';
import LoadingIndicator from '@/components/Chat/LoadingIndicator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';

// Define our chat message interface
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Simplified API call function (will be replaced with a proper backend integration)
const sendMessageToAPI = async (message: string): Promise<string> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate response based on input
      if (message.toLowerCase().includes('study') && message.toLowerCase().includes('where')) {
        resolve("There are many great destinations for international students! Popular choices include the USA, UK, Canada, Australia, Germany, and Japan. Each offers unique advantages. What factors are most important for you? (Cost, language, specific programs, etc.)");
      } else if (message.toLowerCase().includes('scholarship')) {
        resolve("Many universities offer scholarships for international students. They're usually based on academic merit, financial need, or specific talents. Some governments also offer scholarships for international students. I'd recommend researching both university-specific scholarships and government programs in your target country.");
      } else if (message.toLowerCase().includes('visa')) {
        resolve("Student visa requirements vary by country. Generally, you'll need: an acceptance letter from an accredited institution, proof of financial support, health insurance, and a valid passport. Some countries also require language proficiency tests. Which country are you interested in?");
      } else if (message.toLowerCase().includes('cost') || message.toLowerCase().includes('expensive')) {
        resolve("The cost of studying abroad varies widely by country and city. For example, the US and UK tend to be more expensive, while countries like Germany offer free or low-cost tuition. Beyond tuition, consider living expenses like housing, food, transportation, and health insurance. Would you like more specific information about a particular country?");
      } else {
        resolve("I'm your AI guide to studying abroad! I can help with information about universities, scholarships, visa requirements, living costs, and more. What specific information are you looking for today?");
      }
    }, 1500); // 1.5 second delay to simulate API call
  });
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('skymarkChatHistory');
    if (savedMessages) {
      try {
        const parsedMessages: Message[] = JSON.parse(savedMessages);
        // Convert string dates back to Date objects
        const messagesWithDates = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
      }
    } else {
      // Add welcome message if no history exists
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "Hi! I'm skymark, your AI guide to studying abroad 🌍✈️ — where would you like to study?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('skymarkChatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Create new user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isUser: true,
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Start loading state
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await sendMessageToAPI(content);
      
      // Create bot response message
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      // Add bot message to chat
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    // Clear chat history from state and localStorage
    setMessages([{
      id: 'welcome',
      content: "Hi! I'm skymark, your AI guide to studying abroad 🌍✈️ — where would you like to study?",
      isUser: false,
      timestamp: new Date()
    }]);
    localStorage.removeItem('skymarkChatHistory');
    
    toast({
      title: "Chat cleared",
      description: "Your conversation history has been reset.",
    });
  };

  return (
    <PageLayout className="flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="glass-effect rounded-lg overflow-hidden border border-white/10 shadow-lg flex flex-col h-[75vh]">
          {/* Chat header */}
          <div className="bg-secondary/50 p-3 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skymark to-skymark-light flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <h2 className="ml-3 text-white font-medium">Skymark Assistant</h2>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearChat}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </div>
          
          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className="flex-grow p-4 overflow-y-auto custom-scrollbar bg-gradient-to-b from-secondary/20 to-secondary/10"
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {isLoading && <LoadingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="p-4 border-t border-gray-800 bg-secondary/30">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
