
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageLayout from '@/components/Layout/PageLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

// API base URL - adjust based on your deployment setup
const API_BASE_URL = 'http://localhost:5000/api';

const AdminPage = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch fine-tuning jobs
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['fineTuningJobs'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/training/jobs`);
      return response.data.data || [];
    },
    refetchInterval: 30000, // Refetch every 30 seconds to update status
  });

  // Create a new fine-tuning job
  const createJobMutation = useMutation({
    mutationFn: async () => {
      return await axios.post(`${API_BASE_URL}/training/create-job`, {
        model: selectedModel
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: 'Fine-tuning job created successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['fineTuningJobs'] });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error creating job',
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Use a fine-tuned model
  const useModelMutation = useMutation({
    mutationFn: async (modelId: string) => {
      return await axios.post(`${API_BASE_URL}/training/use-model`, {
        modelId
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: 'Now using the selected model for chat',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error setting model',
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleCreateJob = () => {
    createJobMutation.mutate();
  };

  const handleUseModel = (modelId: string) => {
    useModelMutation.mutate(modelId);
  };

  // Format relative time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    <PageLayout className="flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Training Administration</h1>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="create">Create Training Job</TabsTrigger>
            <TabsTrigger value="jobs">Manage Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Train OpenAI with Your Data</CardTitle>
                <CardDescription>
                  Create a new fine-tuning job to improve Skymark's responses using your existing chat data.
                  This process will take your chat history and train OpenAI to better understand your specific use case.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <label className="block mb-2 font-medium">Base Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a base model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5-Turbo (Faster & Lower Cost)</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini (Better Quality)</SelectItem>
                      <SelectItem value="babbage-002">Babbage-002 (Legacy Model)</SelectItem>
                      <SelectItem value="davinci-002">Davinci-002 (Legacy Model)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-2">
                    Note: Training can take several hours depending on the amount of data and the model selected.
                    You'll be able to track the status of your job in the "Manage Jobs" tab.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={handleCreateJob}
                  disabled={createJobMutation.isPending}
                >
                  {createJobMutation.isPending ? 'Creating Job...' : 'Start Training'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Fine-Tuning Jobs</CardTitle>
                <CardDescription>
                  Monitor the status of your OpenAI fine-tuning jobs and apply completed models.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Loading jobs...</div>
                ) : error ? (
                  <div className="text-red-500 py-4">Error loading jobs: {(error as any).message}</div>
                ) : jobs && jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs.map((job: any) => (
                      <Card key={job.id} className="bg-secondary/10">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{job.fine_tuned_model || job.model}</CardTitle>
                            <span className={`px-2 py-1 rounded text-xs ${
                              job.status === 'succeeded' ? 'bg-green-100 text-green-800' : 
                              job.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {job.status.toUpperCase()}
                            </span>
                          </div>
                          <CardDescription>Created {formatTime(job.created_at)}</CardDescription>
                        </CardHeader>
                        
                        <CardFooter className="pt-2">
                          {job.status === 'succeeded' && (
                            <Button 
                              onClick={() => handleUseModel(job.fine_tuned_model)}
                              size="sm"
                            >
                              Use This Model
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No fine-tuning jobs found. Create your first job in the "Create Training Job" tab.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminPage;
