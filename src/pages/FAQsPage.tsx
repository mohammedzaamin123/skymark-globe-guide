import { useState } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How can Skymark help me in my study abroad journey?',
    answer: 'Skymark is your AI-powered study abroad assistant that provides personalized information about universities, courses, admission requirements, scholarships, visa processes, and living costs. You can ask specific questions about studying in different countries, and Skymark will provide tailored guidance based on your academic background, budget, and preferences.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'Is the information provided by Skymark accurate?',
    answer: 'Skymark is trained on comprehensive educational resources and regularly updated information. However, as regulations and university requirements can change, we always recommend verifying critical information with official sources like university websites and embassy pages before making decisions.',
    category: 'General'
  },
  {
    id: 'faq-3',
    question: 'How do I choose the right country for studying abroad?',
    answer: 'Choosing the right country depends on several factors: the quality and reputation of education in your field of study, tuition and living costs, language requirements, visa policies, post-study work opportunities, cultural fit, and safety. Skymark can help you compare different countries based on these factors and your personal preferences.',
    category: 'Study Abroad'
  },
  {
    id: 'faq-4',
    question: 'What documents are typically required for university applications?',
    answer: 'Common documents include academic transcripts, standardized test scores (like IELTS/TOEFL for English proficiency, GRE/GMAT for graduate programs), statement of purpose/personal statement, letters of recommendation, resume/CV, portfolio (for specific programs), and proof of funding. Requirements vary by university and program.',
    category: 'Applications'
  },
  {
    id: 'faq-5',
    question: 'How can I find scholarships for international students?',
    answer: 'Look for scholarships offered by: universities (merit-based, need-based), government organizations (like Fulbright, Chevening), private foundations, companies, and international organizations (like the World Bank). Skymark can suggest specific scholarships based on your academic profile, nationality, and field of study.',
    category: 'Financing'
  },
  {
    id: 'faq-6',
    question: 'What English language tests are accepted by universities?',
    answer: 'Most universities accept IELTS Academic and TOEFL iBT. Some also accept Cambridge English qualifications, PTE Academic, or Duolingo English Test. Required scores vary by institution and program level, with graduate programs typically requiring higher scores than undergraduate ones.',
    category: 'Applications'
  },
  {
    id: 'faq-7',
    question: 'How much does it cost to study abroad?',
    answer: 'Costs vary significantly by country, city, and university. They include tuition fees (ranging from free in countries like Germany to $50,000+ at elite US universities), living expenses (accommodation, food, transportation), health insurance, visa fees, and travel costs. Skymark can provide estimates for specific countries and cities.',
    category: 'Financing'
  },
  {
    id: 'faq-8',
    question: 'When should I start applying for universities abroad?',
    answer: 'Start researching at least 12-18 months before your intended start date. Application deadlines vary: US universities often have deadlines 9-12 months before the start date, while some European universities may accept applications 6 months prior. Be aware of different application cycles and intake periods (fall/spring).',
    category: 'Applications'
  },
  {
    id: 'faq-9',
    question: 'Can I work while studying abroad?',
    answer: 'Work regulations vary by country. For example, in the US, F-1 visa holders can work on-campus and later qualify for OPT. In the UK, student visas typically allow up to 20 hours of work per week during term time. Australia allows up to 40 hours per fortnight during sessions. Always check the latest regulations as they may change.',
    category: 'Work & Career'
  },
  {
    id: 'faq-10',
    question: 'What are post-study work opportunities in different countries?',
    answer: 'Post-study work options vary: the UK offers a 2-year Graduate Route visa, Canada offers a Post-Graduation Work Permit for up to 3 years, Australia offers Temporary Graduate visas (2-4 years), and the US offers Optional Practical Training (12-36 months for STEM fields). These policies can change, so verify current regulations.',
    category: 'Work & Career'
  },
  {
    id: 'faq-11',
    question: 'How do I apply for a student visa?',
    answer: 'After receiving university acceptance, gather required documents (acceptance letter, proof of funds, passport, photos, health insurance). Complete the visa application form, pay the fee, and schedule an interview if required. Processing times vary by country, so apply early, ideally 3-4 months before your course starts.',
    category: 'Visa & Immigration'
  },
  {
    id: 'faq-12',
    question: 'What accommodation options are available for international students?',
    answer: 'Options include: university dormitories/halls of residence (convenient but limited), private student housing (purpose-built accommodations), shared apartments/houses with other students, homestays with local families, or private rentals. Each option has different costs and benefits depending on your budget and preferences.',
    category: 'Living Abroad'
  },
  {
    id: 'faq-13',
    question: 'How can I deal with culture shock when studying abroad?',
    answer: "Prepare by researching the culture before arriving, connect with international student groups, maintain contact with family while building a local support network, participate in orientation programs, join clubs/societies, be open to new experiences, and give yourself time to adjust. University counseling services can also help if you're struggling.",
    category: 'Living Abroad'
  },
  {
    id: 'faq-14',
    question: 'Is healthcare covered for international students?',
    answer: "Healthcare coverage varies by country. Many require international students to purchase health insurance. Some countries with universal healthcare systems may cover students (like the UK's NHS), while others require private insurance. Universities often offer health services on campus, but coverage levels differ.",
    category: 'Living Abroad'
  },
  {
    id: 'faq-15',
    question: 'Can Skymark help me with my university application essays?',
    answer: 'Yes, Skymark can provide guidance on structuring your essays, understanding prompts, brainstorming content, and offering feedback on drafts. While Skymark can help you improve your essays, the content should be original and represent your authentic voice and experiences.',
    category: 'Applications'
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

const FAQsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-300 mb-8">
          Find answers to common questions about studying abroad. Can't find what you're looking for? 
          <span className="text-skymark"> Chat with Skymark</span> for personalized assistance.
        </p>
        
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-secondary/30 border-skymark/20 focus-visible:ring-skymark"
          />
        </div>
        
        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryFilter('All')}
            className={`px-4 py-1.5 rounded-full text-sm ${
              activeCategory === 'All'
                ? 'bg-skymark text-white'
                : 'bg-secondary/50 text-gray-300 hover:bg-secondary'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-1.5 rounded-full text-sm ${
                activeCategory === category
                  ? 'bg-skymark text-white'
                  : 'bg-secondary/50 text-gray-300 hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* FAQ Accordion */}
        <div className="glass-effect rounded-lg overflow-hidden border border-white/10">
          <Accordion type="single" collapsible className="divide-y divide-gray-800">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-secondary/50 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300">
                    <p>{faq.answer}</p>
                    <span className="mt-3 inline-block px-2 py-1 bg-secondary/50 rounded text-xs text-skymark">{faq.category}</span>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-300">No FAQs match your search criteria.</p>
              </div>
            )}
          </Accordion>
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 p-6 glass-effect rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-4">
            Our AI assistant Skymark is available 24/7 to answer any specific questions you might have about studying abroad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/chat" className="inline-block">
              <button className="bg-skymark hover:bg-skymark-dark text-white px-6 py-2 rounded-md">
                Chat with Skymark
              </button>
            </a>
            <a href="/contact" className="inline-block">
              <button className="bg-secondary hover:bg-secondary/80 text-white px-6 py-2 rounded-md">
                Contact Support Team
              </button>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQsPage;
