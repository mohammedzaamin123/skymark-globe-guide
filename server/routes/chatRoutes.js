
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Get chat history by user ID
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { db } = req.app.locals;
    
    const chatHistory = await db.collection('conversations')
      .find({ userId })
      .sort({ timestamp: -1 })
      .toArray();
    
    res.status(200).json(chatHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Get individual messages for a user
router.get('/messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { db } = req.app.locals;
    
    const messages = await db.collection('messages')
      .find({ userId })
      .sort({ timestamp: 1 })
      .toArray();
    
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send message and get AI response
router.post('/message', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const { db, openai } = req.app.locals;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get context from previous messages for better responses
    const previousMessages = await db.collection('messages')
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(5)
      .toArray();
    
    // Format messages for OpenAI
    const conversationHistory = previousMessages
      .reverse()
      .map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));
    
    // Add system message for context
    conversationHistory.unshift({
      role: 'system',
      content: 'You are Skymark, an AI guide specialized in providing information about studying abroad. You help students with information about universities, scholarships, visa requirements, living costs, and more. Be informative, friendly, and provide detailed responses.'
    });
    
    // Add the current user message
    conversationHistory.push({
      role: 'user',
      content: message
    });
    
    // Check if there's a fine-tuned model available
    const modelSetting = await db.collection('settings').findOne({ key: 'openaiModel' });
    const model = modelSetting?.value || 'gpt-4o';
    
    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: model,
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1000
    });
    
    const aiResponse = completion.choices[0].message.content;
    
    // Save user message to database
    await db.collection('messages').insertOne({
      userId,
      content: message,
      isUser: true,
      timestamp: new Date()
    });
    
    // Save AI response to database
    await db.collection('messages').insertOne({
      userId,
      content: aiResponse,
      isUser: false,
      timestamp: new Date()
    });
    
    // Update or create conversation
    await db.collection('conversations').updateOne(
      { userId },
      {
        $set: {
          lastMessage: message,
          lastResponse: aiResponse,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    
    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Delete chat history
router.delete('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { db } = req.app.locals;
    
    await db.collection('messages').deleteMany({ userId });
    await db.collection('conversations').deleteMany({ userId });
    
    res.status(200).json({ message: 'Chat history deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat history:', error);
    res.status(500).json({ error: 'Failed to delete chat history' });
  }
});

module.exports = router;
