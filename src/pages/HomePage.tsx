
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/Layout/PageLayout';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to Skymark! 🚀",
      description: "Your AI-powered guide to studying abroad",
      duration: 5000,
    });
  }, [toast]);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-skymark-bg/30 via-skymark-bg to-skymark-bg"></div>
          <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.15),transparent_40%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your AI Guide to <span className="text-skymark">Studying Abroad</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Get instant answers, personalized recommendations, and expert advice on universities, scholarships, visa requirements, and more.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <NavLink to="/chat">
                <Button size="lg" className="bg-skymark hover:bg-skymark-dark text-white">
                  Chat with Skymark
                </Button>
              </NavLink>
              <NavLink to="/destinations">
                <Button variant="outline" size="lg">
                  Explore Destinations
                </Button>
              </NavLink>
            </div>
          </div>
          
          {/* Chat Preview */}
          <div className="max-w-2xl mx-auto glass-effect rounded-lg shadow-xl animate-fade-in overflow-hidden border border-white/10">
            <div className="bg-secondary/50 p-3 border-b border-gray-800">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skymark to-skymark-light flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <h3 className="ml-3 text-white font-medium">Skymark Assistant</h3>
              </div>
            </div>
            
            <div className="p-4 space-y-3 bg-gradient-to-b from-secondary/20 to-secondary/10">
              <div className="chat-bubble bot-bubble">
                Hi! I'm Skymark, your AI guide to studying abroad 🌍✈️ — where would you like to study?
              </div>
              <div className="chat-bubble user-bubble">
                I'd like to study Computer Science in Canada
              </div>
              <div className="chat-bubble bot-bubble">
                Great choice! Canada has excellent universities for Computer Science. The University of Toronto, University of British Columbia, and University of Waterloo are among the top choices. Would you like to know about admission requirements, tuition fees, or scholarship opportunities?
              </div>
              <div className="flex justify-center mt-6">
                <NavLink to="/chat">
                  <Button size="sm" className="bg-skymark hover:bg-skymark-dark text-white">
                    Continue this conversation
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-skymark-bg/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose Skymark?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-lg animate-fade-in">
              <div className="h-12 w-12 rounded-lg bg-skymark/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skymark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Expert Advice</h3>
              <p className="text-gray-300">Get immediate answers to all your study abroad questions, available 24/7 with no waiting time.</p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="h-12 w-12 rounded-lg bg-skymark/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skymark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Recommendations</h3>
              <p className="text-gray-300">Receive tailored advice based on your academic background, budget, and career goals.</p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-12 w-12 rounded-lg bg-skymark/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skymark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Knowledge</h3>
              <p className="text-gray-300">Access detailed information on universities, visa requirements, scholarships, living costs, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Popular Study Destinations</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">Discover top countries for international students with world-class universities and vibrant campus life.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['USA', 'Canada', 'UK', 'Australia'].map((country, index) => (
              <div key={country} className="destination-card glass-effect rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <div className="h-48 bg-gradient-to-br from-skymark/20 to-skymark-dark/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{country}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm mb-4">Top universities, vibrant culture, and diverse opportunities for international students.</p>
                  <NavLink to={`/destinations?country=${country.toLowerCase()}`}>
                    <Button variant="link" className="text-skymark p-0 h-auto">Learn more →</Button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <NavLink to="/destinations">
              <Button variant="outline">View all destinations</Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-transparent to-skymark/5">
        <div className="container mx-auto px-4">
          <div className="glass-effect max-w-3xl mx-auto text-center p-8 rounded-lg border border-skymark/30">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Your Study Abroad Journey?</h2>
            <p className="text-gray-300 mb-6">Chat with Skymark now and get instant answers to all your questions!</p>
            <NavLink to="/chat">
              <Button size="lg" className="bg-skymark hover:bg-skymark-dark text-white">
                Chat with Skymark
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
