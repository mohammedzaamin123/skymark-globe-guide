
const LoadingIndicator = () => {
  return (
    <div className="chat-message mb-4">
      <div className="flex items-start">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skymark to-skymark-light flex items-center justify-center mr-2">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        
        <div className="chat-bubble bot-bubble flex items-center">
          <div className="loading-dots">
            <span className="loading-dot animate-bounce-dot-1"></span>
            <span className="loading-dot animate-bounce-dot-2"></span>
            <span className="loading-dot animate-bounce-dot-3"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
