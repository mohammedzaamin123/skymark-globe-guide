
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/Layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Destination {
  id: string;
  country: string;
  universities: string[];
  description: string;
  costs: string;
  visaInfo: string;
  scholarships: string;
}

const destinations: Destination[] = [
  {
    id: 'usa',
    country: 'USA',
    universities: ['Harvard University', 'MIT', 'Stanford University', 'California Institute of Technology', 'University of Chicago'],
    description: 'The United States hosts the largest number of international students in the world. American universities are widely known for the quality of their teaching and research.',
    costs: 'Average tuition: $20,000-$45,000 per year. Living expenses: $10,000-$20,000 per year depending on the location.',
    visaInfo: 'International students need an F-1 visa to study in the US. You\'ll need an acceptance letter, proof of financial support, and to pay the SEVIS fee.',
    scholarships: 'Fulbright Program, Hubert Humphrey Fellowship Program, and university-specific scholarships are available for international students.'
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    universities: ['Oxford University', 'Cambridge University', 'Imperial College London', 'University College London', 'London School of Economics'],
    description: 'The UK is known for its high-quality education and multicultural environment. British degrees are recognized and respected worldwide.',
    costs: 'Average tuition: £10,000-£20,000 per year. Living expenses: £800-£1,300 per month depending on the location.',
    visaInfo: 'You\'ll need a Student visa (formerly Tier 4). Requirements include an acceptance letter, proof of funds, and English language proficiency.',
    scholarships: 'Chevening Scholarships, Commonwealth Scholarships, and GREAT Scholarships are notable options for international students.'
  },
  {
    id: 'australia',
    country: 'Australia',
    universities: ['University of Melbourne', 'Australian National University', 'University of Sydney', 'University of Queensland', 'Monash University'],
    description: 'Australia offers a relaxed, high-quality lifestyle with excellent education standards and a focus on research opportunities.',
    costs: 'Average tuition: AUD 20,000-45,000 per year. Living expenses: AUD 20,000-27,000 per year.',
    visaInfo: 'You\'ll need a Student visa (subclass 500). Requirements include enrollment in a course, health insurance, and financial capacity proof.',
    scholarships: 'Australia Awards, Destination Australia Scholarships, and Research Training Program are available for international students.'
  },
  {
    id: 'canada',
    country: 'Canada',
    universities: ['University of Toronto', 'University of British Columbia', 'McGill University', 'University of Montreal', 'University of Alberta'],
    description: 'Canada is known for its welcoming attitude towards immigrants and international students, along with high-quality education and research opportunities.',
    costs: 'Average tuition: CAD 20,000-30,000 per year. Living expenses: CAD 10,000-15,000 per year.',
    visaInfo: 'You\'ll need a study permit. Requirements include an acceptance letter, proof of funds, and possibly a Temporary Resident Visa.',
    scholarships: 'Vanier Canada Graduate Scholarships, Banting Postdoctoral Fellowships, and university-specific scholarships are available.'
  },
  {
    id: 'germany',
    country: 'Germany',
    universities: ['Technical University of Munich', 'Ludwig Maximilian University of Munich', 'Heidelberg University', 'Humboldt University of Berlin', 'RWTH Aachen University'],
    description: 'Germany offers excellent higher education with many programs taught in English, and many public universities offer free tuition even for international students.',
    costs: 'Average tuition: €0-3,000 per year (many public universities are tuition-free). Living expenses: €800-1,000 per month.',
    visaInfo: 'Non-EU students need a student visa/residence permit. You\'ll need an acceptance letter, proof of funds, health insurance.',
    scholarships: 'DAAD Scholarships, Erasmus+, and Deutschland Stipendium are popular funding options.'
  },
  {
    id: 'japan',
    country: 'Japan',
    universities: ['University of Tokyo', 'Kyoto University', 'Osaka University', 'Tohoku University', 'Tokyo Institute of Technology'],
    description: 'Japan offers a unique blend of traditional culture and cutting-edge technology, with internationally recognized universities.',
    costs: 'Average tuition: ¥535,800-¥1,000,000 per year. Living expenses: ¥100,000-¥150,000 per month.',
    visaInfo: 'You\'ll need a student visa. Requirements include a Certificate of Eligibility from your school, valid passport, and application forms.',
    scholarships: 'MEXT Scholarship, JASSO Student Exchange Support Program, and university-specific scholarships are available.'
  },
  {
    id: 'singapore',
    country: 'Singapore',
    universities: ['National University of Singapore', 'Nanyang Technological University', 'Singapore Management University', 'Singapore University of Technology and Design'],
    description: 'Singapore is a global education hub with world-class universities that offer a multicultural environment and strong connections to industry.',
    costs: 'Average tuition: SGD 20,000-45,000 per year. Living expenses: SGD 10,000-15,000 per year.',
    visaInfo: 'You\'ll need a Student\'s Pass. Your school will apply for it on your behalf once you're accepted.',
    scholarships: 'Singapore International Graduate Award, ASEAN Scholarships, and university-specific scholarships are available.'
  },
  {
    id: 'netherlands',
    country: 'Netherlands',
    universities: ['University of Amsterdam', 'Delft University of Technology', 'Utrecht University', 'Leiden University', 'Erasmus University Rotterdam'],
    description: 'The Netherlands offers numerous English-taught programs with reasonable tuition fees and a high quality of education.',
    costs: 'Average tuition: €6,000-20,000 per year. Living expenses: €800-1,200 per month.',
    visaInfo: 'Non-EU students need a residence permit. Your educational institution will usually apply for it on your behalf.',
    scholarships: 'Orange Tulip Scholarship, Holland Scholarship, and university-specific scholarships are available.'
  }
];

const DestinationsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCountry = searchParams.get('country') || '';
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  
  // Update filtered destinations when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      const destination = destinations.find(d => d.id === selectedCountry);
      setSelectedDestination(destination || null);
      setFilteredDestinations(destinations.filter(d => d.id === selectedCountry));
    } else {
      setSelectedDestination(null);
      setFilteredDestinations(destinations);
    }
  }, [selectedCountry]);

  // Handle country filter change
  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    setActiveTab('overview');
  };

  // Handle clear filter
  const handleClearFilter = () => {
    setSelectedCountry('');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Study Abroad Destinations</h1>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Explore top destinations for international students around the world. Get information on universities, costs, visa requirements, and scholarship opportunities.
        </p>

        {/* Country filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">Select a Country</h2>
          <div className="flex flex-wrap gap-2">
            {destinations.map((destination) => (
              <Button
                key={destination.id}
                variant={selectedCountry === destination.id ? "default" : "outline"}
                className={selectedCountry === destination.id ? "bg-skymark hover:bg-skymark-dark" : ""}
                onClick={() => handleCountrySelect(destination.id)}
              >
                {destination.country}
              </Button>
            ))}
            
            {selectedCountry && (
              <Button variant="ghost" onClick={handleClearFilter} className="ml-2">
                Clear Filter
              </Button>
            )}
          </div>
        </div>

        {/* Destination cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="glass-effect rounded-lg overflow-hidden animate-fade-in border border-white/10">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{destination.country}</h2>
                
                {/* Tabs for destination details */}
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="costs">Costs</TabsTrigger>
                    <TabsTrigger value="visa">Visa</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="text-gray-300">
                    <p className="mb-4">{destination.description}</p>
                    <h3 className="text-white font-semibold mb-2">Top Universities</h3>
                    <ul className="list-disc list-inside mb-4">
                      {destination.universities.map((uni, index) => (
                        <li key={index}>{uni}</li>
                      ))}
                    </ul>
                    <h3 className="text-white font-semibold mb-2">Scholarships</h3>
                    <p>{destination.scholarships}</p>
                  </TabsContent>
                  
                  <TabsContent value="costs" className="text-gray-300">
                    <h3 className="text-white font-semibold mb-2">Tuition & Living Expenses</h3>
                    <p>{destination.costs}</p>
                  </TabsContent>
                  
                  <TabsContent value="visa" className="text-gray-300">
                    <h3 className="text-white font-semibold mb-2">Visa Requirements</h3>
                    <p>{destination.visaInfo}</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ))}
        </div>
        
        {/* No results message */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300 mb-4">No destinations match your filter criteria.</p>
            <Button onClick={handleClearFilter}>Clear Filters</Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default DestinationsPage;
