
import PageLayout from '@/components/Layout/PageLayout';

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">About Skymark</h1>
          
          <div className="glass-effect rounded-lg p-8 mb-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              Skymark was created to democratize access to high-quality information about studying abroad. 
              We believe that every student deserves personalized guidance to make informed decisions about their educational future, 
              regardless of their background or resources.
            </p>
            <p className="text-gray-300">
              Using cutting-edge AI technology, we're able to provide instant, accurate, and personalized advice to students worldwide, 
              breaking down barriers to international education and empowering the next generation of global citizens.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">How Skymark Works</h2>
          <div className="space-y-8 mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3">
                <div className="glass-effect rounded-lg h-full p-6 text-center border border-white/10">
                  <div className="h-16 w-16 rounded-full bg-skymark/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-skymark text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced AI</h3>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-gray-300">
                <p>
                  Skymark is powered by OpenAI's GPT-4 technology, one of the most advanced AI language models in the world. 
                  It's been specifically trained on extensive educational resources, university databases, visa regulations, 
                  and scholarship information to provide accurate and helpful guidance.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3">
                <div className="glass-effect rounded-lg h-full p-6 text-center border border-white/10">
                  <div className="h-16 w-16 rounded-full bg-skymark/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-skymark text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Personalized Advice</h3>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-gray-300">
                <p>
                  Unlike generic search engines, Skymark understands the context of your questions and remembers your previous 
                  interactions to provide increasingly personalized recommendations. It can adapt its suggestions based on your 
                  academic background, budget constraints, career goals, and personal preferences.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3">
                <div className="glass-effect rounded-lg h-full p-6 text-center border border-white/10">
                  <div className="h-16 w-16 rounded-full bg-skymark/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-skymark text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Always Available</h3>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-gray-300">
                <p>
                  Skymark is available 24/7, providing instant responses to your questions whenever inspiration strikes or 
                  concerns arise. This accessibility ensures that students from all time zones and with varying schedules can 
                  receive guidance whenever they need it.
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-8 mb-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-gray-300 mb-6">
              Behind Skymark is a team of education experts, international student advisors, and AI specialists passionate about 
              making quality educational guidance accessible to everyone. Our team has firsthand experience with the challenges of 
              studying abroad and has built Skymark to address the pain points they encountered in their own journeys.
            </p>
            <p className="text-gray-300">
              We continuously update and refine Skymark's knowledge base to ensure it provides the most current and accurate 
              information about universities, visa requirements, scholarships, and living costs around the world.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Accuracy</h3>
              <p className="text-gray-300">
                We're committed to providing accurate, up-to-date information. While Skymark is highly knowledgeable, we always 
                recommend verifying critical details with official sources like university websites and embassy pages.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Privacy</h3>
              <p className="text-gray-300">
                Your privacy is important to us. We use your conversations only to improve Skymark's responses and provide better 
                personalized guidance. Your data is never sold to third parties.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Inclusivity</h3>
              <p className="text-gray-300">
                We believe in making educational opportunities accessible to everyone. Skymark is designed to help students from all 
                backgrounds navigate the complex process of studying abroad.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Continuous Improvement</h3>
              <p className="text-gray-300">
                Skymark learns from every interaction to become more helpful. We regularly update our information and fine-tune 
                our AI to better serve your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
