
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all fine-tuning jobs
router.get('/jobs', async (req, res) => {
  try {
    const { openai } = req.app.locals;
    
    const jobs = await openai.fineTuning.jobs.list();
    
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching fine-tuning jobs:', error);
    res.status(500).json({ error: 'Failed to fetch fine-tuning jobs', details: error.message });
  }
});

// Get job status
router.get('/jobs/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const { openai } = req.app.locals;
    
    const job = await openai.fineTuning.jobs.retrieve(jobId);
    
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching fine-tuning job status:', error);
    res.status(500).json({ error: 'Failed to fetch job status', details: error.message });
  }
});

// Create a new fine-tuning job from existing chat data
router.post('/create-job', async (req, res) => {
  try {
    const { model = "gpt-3.5-turbo" } = req.body;
    const { db, openai } = req.app.locals;
    
    // Fetch messages from the database to create training data
    const messages = await db.collection('messages').find({}).toArray();
    
    if (messages.length < 10) {
      return res.status(400).json({ 
        error: 'Not enough training data', 
        message: 'You need at least 10 message pairs (user and assistant) for fine-tuning' 
      });
    }
    
    // Process messages into training format required by OpenAI
    const conversations = {};
    
    messages.forEach(msg => {
      if (!conversations[msg.userId]) {
        conversations[msg.userId] = [];
      }
      
      conversations[msg.userId].push({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      });
    });
    
    // Create training data in JSONL format
    const trainingData = [];
    
    Object.values(conversations).forEach(conversation => {
      // We need at least one user message and one assistant response
      if (conversation.length >= 2) {
        // Group by conversation chunks
        let currentConversation = [];
        
        conversation.forEach(msg => {
          currentConversation.push(msg);
          
          // When we have an assistant response, we can create a training example
          if (msg.role === 'assistant' && currentConversation.length >= 2) {
            trainingData.push({
              messages: [
                {
                  role: 'system',
                  content: 'You are Skymark, an AI guide specialized in providing information about studying abroad. You help students with information about universities, scholarships, visa requirements, living costs, and more. Be informative, friendly, and provide detailed responses.'
                },
                ...currentConversation
              ]
            });
          }
        });
      }
    });
    
    if (trainingData.length === 0) {
      return res.status(400).json({
        error: 'Invalid training data',
        message: 'Could not create valid training examples from your chat history'
      });
    }
    
    // Write training data to a temporary file
    const tempFilePath = path.join(__dirname, '..', 'temp_training_data.jsonl');
    
    fs.writeFileSync(
      tempFilePath, 
      trainingData.map(item => JSON.stringify(item)).join('\n')
    );
    
    // Upload the file to OpenAI
    const file = await openai.files.create({
      file: fs.createReadStream(tempFilePath),
      purpose: 'fine-tune',
    });
    
    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
    
    // Create a fine-tuning job
    const fineTuningJob = await openai.fineTuning.jobs.create({
      training_file: file.id,
      model: model,
    });
    
    // Save job info to database
    await db.collection('fineTuningJobs').insertOne({
      jobId: fineTuningJob.id,
      status: fineTuningJob.status,
      model: model,
      createdAt: new Date(),
      fineTunedModel: null
    });
    
    res.status(200).json({
      success: true,
      message: 'Fine-tuning job created successfully',
      jobInfo: fineTuningJob
    });
    
  } catch (error) {
    console.error('Error creating fine-tuning job:', error);
    res.status(500).json({ error: 'Failed to create fine-tuning job', details: error.message });
  }
});

// Use fine-tuned model for chat
router.post('/use-model', async (req, res) => {
  try {
    const { modelId } = req.body;
    const { db } = req.app.locals;
    
    // Update the default model in settings collection
    await db.collection('settings').updateOne(
      { key: 'openaiModel' },
      { $set: { value: modelId } },
      { upsert: true }
    );
    
    res.status(200).json({
      success: true,
      message: `Now using fine-tuned model: ${modelId}`
    });
    
  } catch (error) {
    console.error('Error setting fine-tuned model:', error);
    res.status(500).json({ error: 'Failed to set fine-tuned model', details: error.message });
  }
});

module.exports = router;
