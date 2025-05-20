
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import PageLayout from '@/components/Layout/PageLayout';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(1, {
    message: 'Please select a subject.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
  });

  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Simulate a delay for API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      
      toast({
        title: 'Message sent!',
        description: 'We\'ll get back to you as soon as possible.',
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was a problem sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-gray-300 mb-8">
            Have questions or feedback? Get in touch with our team and we'll get back to you as soon as possible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact form */}
            <div className="md:col-span-2">
              <div className="glass-effect rounded-lg p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                                className="bg-secondary/30 border-skymark/20 focus-visible:ring-skymark"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                type="email" 
                                {...field} 
                                className="bg-secondary/30 border-skymark/20 focus-visible:ring-skymark"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Subject</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-secondary/30 border-skymark/20 focus:ring-skymark">
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              rows={6} 
                              {...field} 
                              className="bg-secondary/30 border-skymark/20 focus-visible:ring-skymark resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-skymark hover:bg-skymark-dark"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Contact info */}
            <div className="md:col-span-1">
              <div className="glass-effect rounded-lg p-6 md:p-8 border border-white/10 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-skymark font-medium">Email</p>
                    <p className="text-gray-300">support@skymark.ai</p>
                  </div>
                  
                  <div>
                    <p className="text-skymark font-medium">Chat Support</p>
                    <p className="text-gray-300">Available 24/7 through our AI assistant</p>
                  </div>
                  
                  <div>
                    <p className="text-skymark font-medium">Human Support</p>
                    <p className="text-gray-300">Monday-Friday: 9AM-5PM EST</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-lg p-6 md:p-8 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
                
                <div className="space-y-2">
                  <a href="/chat" className="block text-skymark hover:underline">Chat with Skymark</a>
                  <a href="/faqs" className="block text-skymark hover:underline">FAQ Page</a>
                  <a href="/about" className="block text-skymark hover:underline">About Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
